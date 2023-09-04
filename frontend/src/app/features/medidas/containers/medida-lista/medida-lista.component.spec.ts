import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedidaListaComponent } from './medida-lista.component';

describe('MedidaListaComponent', () => {
  let component: MedidaListaComponent;
  let fixture: ComponentFixture<MedidaListaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedidaListaComponent]
    });
    fixture = TestBed.createComponent(MedidaListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
