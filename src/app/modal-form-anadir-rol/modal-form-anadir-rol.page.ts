import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-form-anadir-rol',
  templateUrl: './modal-form-anadir-rol.page.html',
  styleUrls: ['./modal-form-anadir-rol.page.scss'],
})
export class ModalFormAnadirRolPage implements OnInit {

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }


  cerrarModal() {
    this.modalController.dismiss();
  }
}
