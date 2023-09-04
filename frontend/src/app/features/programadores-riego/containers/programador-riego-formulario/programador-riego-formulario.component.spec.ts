import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramadorRiegoFormularioComponent } from './programador-riego-formulario.component';

describe('ProgramadorRiegoFormularioComponent', () => {
  let component: ProgramadorRiegoFormularioComponent;
  let fixture: ComponentFixture<ProgramadorRiegoFormularioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgramadorRiegoFormularioComponent]
    });
    fixture = TestBed.createComponent(ProgramadorRiegoFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
