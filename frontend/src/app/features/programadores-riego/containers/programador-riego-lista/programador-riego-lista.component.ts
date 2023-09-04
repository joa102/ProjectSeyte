import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { ProgramadorRiegoService } from '../../services/programador-riego.service';

import { ProgramadorRiego } from '../../models/programador-riego';


@Component({
  selector: 'app-programador-riego-lista',
  templateUrl: './programador-riego-lista.component.html',
  styleUrls: ['./programador-riego-lista.component.scss'],
  providers: [ProgramadorRiegoService]
})
export class ProgramadorRiegoListaComponent implements OnInit {

  programadoresRiego: any[] = [];
  dataSource!: MatTableDataSource<ProgramadorRiego>;
  idCliente!: number;

  displayedColumns: string[] = ['modelo', 'numero_serie', 'fecha_alta', 'fecha_ultima_conexion', 'accion'];

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
    private peticionesService: ProgramadorRiegoService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.getPaginator();
    this.search.valueChanges.pipe(debounceTime(800)).subscribe(value => {
      this.getPaginator(1, this.pageSize, 'modelo', value as string);
    });
  }

  getPaginator(page = 1, pageSize = 5, fieldName = '', search = ''){

    this.idCliente = parseInt(this.router.url.split('/')[2], 10);

    this.peticionesService.getPaginator(page, pageSize, this.idCliente, fieldName, search).subscribe(
      (data) => {
        this.programadoresRiego = data.data;
        this.dataSource = new MatTableDataSource(this.programadoresRiego);
        this.paginator._intl.itemsPerPageLabel = 'Programadores de riego por página';
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();

    this.dataSource.filterPredicate = (data: ProgramadorRiego, filter: string) => {
      return data.modelo.toLowerCase().includes(filter);
    };

    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  navigateToSensores(programadorRiego: ProgramadorRiego) {
    this.router.navigate( [ '/sensores/'+programadorRiego.id ] );
  }

  addProgramadorRiego(){
    this.idCliente = parseInt(this.router.url.split('/')[2], 10);
    this.router.navigate( [ '/programadoresRiego/' + this.idCliente + '/form' ] );
  }

  deleteProgramadorRiego(programadorRiego: ProgramadorRiego){
    this.peticionesService.deleteProgramadorRiego(programadorRiego.id).subscribe(() => {
      this.getPaginator();
    });
  }

}
