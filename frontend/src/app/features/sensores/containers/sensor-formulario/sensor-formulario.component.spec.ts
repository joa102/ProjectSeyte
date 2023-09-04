import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorFormularioComponent } from './sensor-formulario.component';

describe('SensorFormularioComponent', () => {
  let component: SensorFormularioComponent;
  let fixture: ComponentFixture<SensorFormularioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SensorFormularioComponent]
    });
    fixture = TestBed.createComponent(SensorFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
