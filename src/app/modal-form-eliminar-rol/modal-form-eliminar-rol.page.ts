import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-form-eliminar-rol',
  templateUrl: './modal-form-eliminar-rol.page.html',
  styleUrls: ['./modal-form-eliminar-rol.page.scss'],
})
export class ModalFormEliminarRolPage implements OnInit {

  constructor(private modalController: ModalController) { 
    
  }

  ngOnInit() {
  }


  cerrarModal() {
    this.modalController.dismiss();
  }
}
