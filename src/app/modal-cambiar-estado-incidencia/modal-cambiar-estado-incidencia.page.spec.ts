import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalCambiarEstadoIncidenciaPage } from './modal-cambiar-estado-incidencia.page';

describe('ModalCambiarEstadoIncidenciaPage', () => {
  let component: ModalCambiarEstadoIncidenciaPage;
  let fixture: ComponentFixture<ModalCambiarEstadoIncidenciaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCambiarEstadoIncidenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
