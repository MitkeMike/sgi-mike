import { TestBed } from '@angular/core/testing';

import { DiagnosticosService } from './diagnosticos.service';

describe('DiagnosticosService', () => {
  let service: DiagnosticosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiagnosticosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
