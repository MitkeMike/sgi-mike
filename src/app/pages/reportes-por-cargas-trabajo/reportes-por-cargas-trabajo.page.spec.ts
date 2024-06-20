import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportesPorCargasTrabajoPage } from './reportes-por-cargas-trabajo.page';

describe('ReportesPorCargasTrabajoPage', () => {
  let component: ReportesPorCargasTrabajoPage;
  let fixture: ComponentFixture<ReportesPorCargasTrabajoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportesPorCargasTrabajoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
