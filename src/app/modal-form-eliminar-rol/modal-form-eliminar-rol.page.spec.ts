import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalFormEliminarRolPage } from './modal-form-eliminar-rol.page';

describe('ModalFormEliminarRolPage', () => {
  let component: ModalFormEliminarRolPage;
  let fixture: ComponentFixture<ModalFormEliminarRolPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFormEliminarRolPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
