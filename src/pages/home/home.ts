import { loginService } from './../../service/login/login.service';
import { Component } from '@angular/core';
import { NavController, Platform, NavParams } from 'ionic-angular';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user: any;
  barcodeData: any;
  
  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private barcodeScanner: BarcodeScanner,
    private login: loginService) {
      this.user = navParams.get('user');
    }

  scan(){

    this.barcodeScanner.scan().then((barcodeData) => {
      this.barcodeData = barcodeData;
    }, (err) => {
      this.login.ionicAlert('Error', err , 'Dismiss');
    });
  }
}
