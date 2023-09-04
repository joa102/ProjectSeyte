import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedidaFormularioComponent } from './medida-formulario.component';

describe('MedidaFormularioComponent', () => {
  let component: MedidaFormularioComponent;
  let fixture: ComponentFixture<MedidaFormularioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedidaFormularioComponent]
    });
    fixture = TestBed.createComponent(MedidaFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
