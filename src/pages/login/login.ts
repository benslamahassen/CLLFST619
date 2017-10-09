import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { loginService } from './../../service/login/login.service';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, 
    private login: loginService) {
  }

  ionViewDidLoad() {
  }

  logInWithGoogle(){
    this.user = this.login.googleLogin();
    this.navCtrl.push(HomePage, this.user);
  }
  
  logInWithFacebook(){
    this.user = this.login.facebookLogin();
    this.navCtrl.push(HomePage, this.user);    
  }


}
