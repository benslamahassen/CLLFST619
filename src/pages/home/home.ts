import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { nativeService } from './../../service/native/native.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	product: any;
	isTunisian: boolean = false;

	constructor(
		public navCtrl: NavController,
		private barcodeScanner: BarcodeScanner,
		private native: nativeService,
		private db: AngularFireDatabase,
		private afAuth: AngularFireAuth,
		public events: Events) {
	}

	ionViewDidLoad() {
		this.native.toast('Welcome ' + localStorage.getItem('name'), 4000, 'bottom');
		this.events.publish('homeLoaded', true)					
	}

	ionViewDidLeave(){
		this.events.publish('homeLoaded', false)
	}

	scan() {
		this.barcodeScanner.scan({showTorchButton: true})
			.then((barcodeData) => {
				if (barcodeData.cancelled) {
					return;
				}
				this.db.object('/products/' + barcodeData.text)
					.subscribe((product) => {
						this.product = product
						this.native.alert('Product', JSON.stringify(product), "ok");
						this.isTunisian = this.checkIfTunisian(barcodeData.text);
					})
			})
			.catch((err) => {
				this.native.alert('Scan Error', err, 'Dismiss');
			});
	}

	checkIfTunisian(barcode : string) : boolean {
		return barcode.startsWith('619') 
	}

	logout() {
		localStorage.clear();
		this.afAuth.auth.signOut();
		this.navCtrl.setRoot(LoginPage);
	}

}
