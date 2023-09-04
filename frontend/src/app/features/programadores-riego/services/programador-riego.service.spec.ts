import { TestBed } from '@angular/core/testing';

import { ProgramadorRiegoService } from './programador-riego.service';

describe('ProgramadorRiegoService', () => {
  let service: ProgramadorRiegoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgramadorRiegoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
