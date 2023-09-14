import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';

import { SensorService } from '../../services/sensor.service';
import { Sensor } from '../../models/sensor';

@Component({
  selector: 'app-sensor-lista',
  templateUrl: './sensor-lista.component.html',
  styleUrls: ['./sensor-lista.component.scss'],
  providers: [SensorService]
})
export class SensorListaComponent implements OnInit {

  sensores: any[] = [];
  dataSource!: MatTableDataSource<Sensor>;
  idProgramadorRiego!: number;

  displayedColumns: string[] = ['nombre_sonda', 'accion'];

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
    private peticionesService: SensorService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.getPaginator();
    this.search.valueChanges.pipe(debounceTime(800)).subscribe(value => {
      this.getPaginator(1, this.pageSize, 'nombre_sonda', value as string);
    });
  }

  getPaginator(page = 1, pageSize = 5, fieldName = '', search = ''){

    this.idProgramadorRiego = parseInt(this.router.url.split('/')[2], 10);

    this.peticionesService.getPaginator(page, pageSize, this.idProgramadorRiego, fieldName, search).subscribe(
      (data) => {
        this.sensores = data.data;
        this.dataSource = new MatTableDataSource(this.sensores);
        this.paginator._intl.itemsPerPageLabel = 'Sensores por página';
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

  navigateToMedidas(sensor: Sensor) {
    this.router.navigate( [ '/medidas/'+sensor.id ] );
  }

  addSensor(){
    this.idProgramadorRiego = parseInt(this.router.url.split('/')[2], 10);
    this.router.navigate( [ '/sensores/' + this.idProgramadorRiego + '/form' ] );
  }

  deleteSensor(sensor: Sensor){
    this.peticionesService.deleteSensor(sensor.id).subscribe(() => {
      this.getPaginator();
    });
  }

}
