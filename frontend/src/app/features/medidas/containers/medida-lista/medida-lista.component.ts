import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';

import { MedidaService } from '../../services/medida.service';
import { Medida } from '../../models/medida';

@Component({
  selector: 'app-medida-lista',
  templateUrl: './medida-lista.component.html',
  styleUrls: ['./medida-lista.component.scss'],
  providers: [MedidaService]
})
export class MedidaListaComponent implements OnInit {

  medidas: any[] = [];
  dataSource!: MatTableDataSource<Medida>;
  idSensor!: number;

  displayedColumns: string[] = ['fecha_hora_medida', 'valor', 'accion'];

  length = 0;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25, 50, 100];
  pageEvent!: PageEvent;
  search = new FormControl('');

  showFirstLastButtons = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private peticionesService: MedidaService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.getPaginator();
    this.search.valueChanges.pipe(debounceTime(800)).subscribe(value => {
      this.getPaginator(1, this.pageSize, 'fecha_hora_medida', value as string);
    });
  }

  getPaginator(page = 1, pageSize = 5, fieldName = '', search = ''){

    this.idSensor = parseInt(this.router.url.split('/')[2], 10);

    this.peticionesService.getPaginator(page, pageSize, this.idSensor, fieldName, search).subscribe(
      (data) => {
        this.medidas = data.data;
        this.dataSource = new MatTableDataSource(this.medidas);
        this.paginator._intl.itemsPerPageLabel = 'Medidas por página';
        this.dataSource.sort = this.sort;
        this.paginator.length = data.total;
      },
      (error) =>{
        console.log(error);
      }
    );
  }

  handlePageEvent(e: PageEvent)
  {
    const page = e.pageIndex;
    const pageSize = e.pageSize;

    this.getPaginator(page + 1, pageSize);
  }

  addMedida(){
    this.idSensor = parseInt(this.router.url.split('/')[2], 10);
    this.router.navigate( [ '/medidas/' + this.idSensor + '/form' ] );
  }

  deleteMedida(medida: Medida){
    this.peticionesService.deleteMedida(medida.id).subscribe(() => {
      this.getPaginator();
    });
  }

}
