import { LoginEmailPage } from './../login-email/login-email';
import { SignupPage } from './../signup/signup';
import { nativeService } from './../../service/native/native.service';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

import { AngularFireDatabase } from "angularfire2/database-deprecated";

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
    private native: nativeService,
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    public menu: MenuController) {
      this.menu.enable(false, 'menu');
      
  }

  logInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    this.afAuth.auth.signInWithRedirect(provider).then(() => {
      this.afAuth.auth.getRedirectResult()
        .then((user: firebase.User) => {
          this.db.object('/users/' + user.uid).update({
            name: user.displayName,
            email: user.email,
            picUrl: user.photoURL,
            prodvider: "Google",
          })
            .then(() => {
              this.navCtrl.setRoot(HomePage)
                .catch((err) => this.native.alert('Home Navigation Error', err, 'Dismiss'));
            });
        })
        .catch((err) => this.native.alert('Result Google Error', err.message, 'Ok'));
    })
      .catch((err) => this.native.alert('Login Google Error', err.message, 'Ok'));

  }

  logInWithFacebook() {
    this.facebook.login(['email'])
      .then((loginResponse: FacebookLoginResponse) => {
        let credential = firebase.auth.FacebookAuthProvider.credential(loginResponse.authResponse.accessToken)
        this.afAuth.auth.signInWithCredential(credential)
          .then((user: firebase.User) => {
            this.db.object('/users/' + user.uid).update({
              name: user.displayName,
              email: user.email,
              picUrl: user.photoURL,
              prodvider: 'Facebook',
            })
              .then(() => {
                localStorage.setItem('uid', user.uid);
                localStorage.setItem('name', user.displayName);
                localStorage.setItem('picture', user.photoURL);

                this.navCtrl.setRoot(HomePage)
                  .catch((err) => this.native.alert('Error', err, 'Dismiss'));
              })
          })
          .catch(error => this.native.alert('Error', error.message, 'Dismiss'))
      });
  }

  signUp() {
    this.navCtrl.push(SignupPage);
  }

  signInWithEmail() {
    this.navCtrl.push(LoginEmailPage);
  }
  ionViewDidLeave(){
   this.menu.enable(true, 'menu');
  }
}
