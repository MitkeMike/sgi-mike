import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsignarIncidenciaPage } from './asignar-incidencia.page';

describe('AsignarIncidenciaPage', () => {
  let component: AsignarIncidenciaPage;
  let fixture: ComponentFixture<AsignarIncidenciaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarIncidenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
