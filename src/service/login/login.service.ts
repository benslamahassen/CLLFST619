import { Injectable } from "@angular/core";

import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';


@Injectable()
export class nativeService {
    constructor(
        public alertCtrl: AlertController,
        public toastCtrl: ToastController,
        public loadingCtrl: LoadingController
    ) { }

    loading() {
        let loader = this.loadingCtrl.create({
            content: "Please wait...",
            duration: 3000
        });
        loader.present();
    }

    alert(Title: any, Message: any, buttonText) {
        const alert = this.alertCtrl.create({
            title: Title,
            message: Message,
            buttons: [{
                text: buttonText,
                role: 'cancel',
                handler: () => { }
            }]
        });
        alert.present();
    }

    toast(message: any, duration: number, position: any) {
        const toast = this.toastCtrl.create({
            message: message,
            duration: duration,
            position: position
        });

        toast.onDidDismiss(() => {
        });

        toast.present();
    }
}