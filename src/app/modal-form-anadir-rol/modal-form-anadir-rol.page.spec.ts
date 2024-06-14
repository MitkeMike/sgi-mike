import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalFormAnadirRolPage } from './modal-form-anadir-rol.page';

describe('ModalFormAnadirRolPage', () => {
  let component: ModalFormAnadirRolPage;
  let fixture: ComponentFixture<ModalFormAnadirRolPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFormAnadirRolPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
