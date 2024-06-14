import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MostrarUsuariosPage } from './mostrar-usuarios.page';

describe('MostrarUsuariosPage', () => {
  let component: MostrarUsuariosPage;
  let fixture: ComponentFixture<MostrarUsuariosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarUsuariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
