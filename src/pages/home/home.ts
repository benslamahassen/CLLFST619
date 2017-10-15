import { nativeService } from './../../service/native/native.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { NavController, Platform, NavParams } from 'ionic-angular';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user: firebase.User;
  barcodeData: any;

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private barcodeScanner: BarcodeScanner,
    private native: nativeService,
    private afAuth: AngularFireAuth) {
    
      this.afAuth.authState.subscribe(user => this.user = user)
      // this.native.loading(1000);
  }
  ionViewDidEnter() {
    this.native.toast('Welcome ' + this.user.displayName, 4000, 'bottom');
  }
  ionViewDidLoad() {

  }
  scan() {

    this.barcodeScanner.scan().then((barcodeData) => {
      this.barcodeData = barcodeData;
    }, (err) => {
      this.native.alert('Error', err, 'Dismiss');
    });
  }
  
  logout() {
    this.afAuth.auth.signOut();
    this.navCtrl.setRoot(LoginPage);
  }

}
