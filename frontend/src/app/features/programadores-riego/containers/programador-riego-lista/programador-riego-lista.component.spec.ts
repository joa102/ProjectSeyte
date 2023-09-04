import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramadorRiegoListaComponent } from './programador-riego-lista.component';

describe('ProgramadorRiegoListaComponent', () => {
  let component: ProgramadorRiegoListaComponent;
  let fixture: ComponentFixture<ProgramadorRiegoListaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgramadorRiegoListaComponent]
    });
    fixture = TestBed.createComponent(ProgramadorRiegoListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
