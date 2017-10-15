import { nativeService } from './../../service/native/native.service';
import { firebaseUser } from './../../models/user.model';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from "angularfire2/database-deprecated";

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user: firebase.User;
  constructor(
    public facebook: Facebook,
    public navCtrl: NavController,
    public navParams: NavParams,
    private native: nativeService,
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth) {
  }

  ionViewDidLoad() {
  }
  save ( user: firebaseUser){
    this.db.object('/users/' + user.$key ).update({
      name: user.name,
      email: user.email,
      picUrl: user.picture,
      }) 
  }
  logInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    this.afAuth.auth.signInWithRedirect(provider)
    .then(()=>{
      this.navCtrl.setRoot(HomePage)
        .catch((err)=>this.native.alert('Error', err, 'Dismiss'));
    })
    .catch((err)=>this.native.alert('Error', err.message, 'Ok'));
  }

  logInWithFacebook() {
    this.facebook.login(['email'])
      .then((loginResponse: FacebookLoginResponse) => {
        let credential = firebase.auth.FacebookAuthProvider.credential(loginResponse.authResponse.accessToken)
        this.afAuth.auth.signInWithCredential(credential)
          .then(() => {
            this.navCtrl.setRoot(HomePage)
            .catch((err)=>this.native.alert('Error', err, 'Dismiss'));
          })
          .catch(error => this.native.alert('Error', error.message, 'Dismiss'))
      });
  }
}
