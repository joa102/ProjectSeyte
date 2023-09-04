import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { ClienteService } from '../../services/cliente.service';

import { Cliente } from '../../models/cliente';

@Component({
  selector: 'app-cliente-lista',
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.scss'],
  providers: [ClienteService]
})
export class ClienteListaComponent implements OnInit {

  clientes: any[] = [];
  dataSource!: MatTableDataSource<Cliente>;

  displayedColumns: string[] = ['codigo', 'razon_social', 'cif', 'direccion', 'municipio', 'provincia', 'fecha_inicio_contrato', 'fecha_expiracion_contrato', 'accion'];

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
    private peticionesService: ClienteService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.getPaginator();
    this.search.valueChanges.pipe(debounceTime(800)).subscribe(value => {
      this.getPaginator(1, this.pageSize, 'razon_social,municipio', value as string);
    });
  }

  getPaginator(page = 1, pageSize = 5, fieldName = '', search = ''){

    this.peticionesService.getPaginator(page, pageSize, fieldName, search).subscribe(
      (data) => {
        this.clientes = data.data;
        this.dataSource = new MatTableDataSource(this.clientes);
        this.paginator._intl.itemsPerPageLabel = 'Clientes por página';
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

  navigateToProgramadorRiego(cliente: Cliente) {
    this.router.navigate( [ '/programadoresRiego/'+cliente.id ] );
  }

  updateCliente(cliente: Cliente){
    this.router.navigate( [ '/clientes/form/' + cliente.id ] );
  }

  addCliente(){
    this.router.navigate( [ '/clientes/form' ] );
  }

  deleteCliente(cliente: Cliente){
    this.peticionesService.deleteClient(cliente.id).subscribe(() => {
      this.getPaginator();
    });
  }

}
