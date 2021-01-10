import { Injectable } from '@angular/core';
import {ToastController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private toastController: ToastController) { }

  onNetworkError(error, header='Network Error'){
    console.log(error);
    let message = JSON.stringify(error);

    if (error.error.error && error.error.message)
      message = error.error.message;

    this.toastController.create({
      header: header,
      message: message,
      duration:3000
    }).then(t => t.present());
  }

  onError(header: string, message: string) {
    this.toastController.create({
      header: header,
      message: message,
      duration:3000
    }).then(t => t.present());
  }
}
