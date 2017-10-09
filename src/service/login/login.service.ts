import { Injectable } from "@angular/core";

import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";

import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

@Injectable()
export class loginService {

    constructor(
        public facebook: Facebook,
        public alertCtrl: AlertController,
        public toastCtrl: ToastController, ) {

    }
    ionicAlert(Title: any, Message: any, buttonText) {
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

    ionicToast(message: any, duration: number, position: any) {
        const toast = this.toastCtrl.create({
            message: message,
            duration: duration,
            position: position
        });

        toast.onDidDismiss(() => {
        });

        toast.present();
    }

    googleLogin() {
        const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithRedirect(provider).then(() => {
            firebase.auth().getRedirectResult().then(result => {
                var gguser = result.user;
                this.ionicToast('Welcome ' + gguser.displayName, 3000, 'bottom');
                return gguser;
            }).catch(function (error) {
                this.ionicAlert('Alert', error.message, 'Ok');
            });
        });
    }

    facebookLogin() {
        this.facebook.login(['email'])
            .then((loginResponse: FacebookLoginResponse) => {
                let credential = firebase.auth.FacebookAuthProvider.credential(loginResponse.authResponse.accessToken)
                firebase.auth().signInWithCredential(credential)
                    .then((fbuser) => {
                        this.ionicToast('welcome ' + fbuser.displayName, 3000, 'bottom');
                        return fbuser ;
                    })
                    .catch(error => this.ionicAlert('Error', error.message, 'Dismiss'))
            });
    }
}