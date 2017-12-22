import { HomePage } from './../home/home';
import { nativeService } from './../../service/native/native.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from './../../models/user.model';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-login-email',
  templateUrl: 'login-email.html',
})
export class LoginEmailPage {
  defaultUserPic = "http://www.abc.net.au/news/image/8314104-1x1-940x940.jpg";  
  user = {} as User
  constructor(public navCtrl: NavController, 
              private native : nativeService,
              private afauth: AngularFireAuth,) {
  }

   loginWithEmail(user : User){

    this.afauth.auth.signInWithEmailAndPassword(user.email , user.password)
    .then((fbuser: firebase.User)=> {
      localStorage.setItem('uid', fbuser.uid)
      localStorage.setItem('name', user.email);
      localStorage.setItem('picture', this.defaultUserPic )
      this.navCtrl.setRoot(HomePage);
    })
    .catch((e) => this.native.alert('Login Error', e , 'Dismiss'))
  }
}
