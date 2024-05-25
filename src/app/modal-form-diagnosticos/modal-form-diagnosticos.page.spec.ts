import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalFormDiagnosticosPage } from './modal-form-diagnosticos.page';

describe('ModalFormDiagnosticosPage', () => {
  let component: ModalFormDiagnosticosPage;
  let fixture: ComponentFixture<ModalFormDiagnosticosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFormDiagnosticosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
