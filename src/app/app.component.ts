import { SignupPage } from './../pages/signup/signup';
import { AboutPage } from './../pages/about/about';
import { ProfilePage } from './../pages/profile/profile';
import { nativeService } from './../service/native/native.service';
import { LoginPage } from './../pages/login/login';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

import firebase from 'firebase';


@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	@ViewChild(Nav) nav: Nav;
	rootPage: any;

	name: string;
	photoURL: string = "http://www.abc.net.au/news/image/8314104-1x1-940x940.jpg"
	homeLoaded: boolean;

	pages: Array<{ title: string, component: any }>;

	constructor(
		public platform: Platform,
		public statusBar: StatusBar,
		public splashScreen: SplashScreen,
		public events: Events,
		private native: nativeService){
		this.initializeApp();
		this.pages = [
			{ title: 'Home', component: HomePage },
			{ title: 'Profile', component: ProfilePage },
			{ title: 'About us', component: AboutPage },
		];
	}

	initializeApp() {
		this.platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			firebase.initializeApp({
				apiKey: "AIzaSyCVG6YiQfPRCneOhYamqmpQFzxFJ1oCuO4",
				authDomain: "cllfst-d3498.firebaseapp.com",
				databaseURL: "https://cllfst-d3498.firebaseio.com",
				projectId: "cllfst-d3498",
				storageBucket: "cllfst-d3498.appspot.com",
				messagingSenderId: "28930317512"
			});
			if (localStorage.getItem('uid')) {
				this.name = localStorage.getItem('name');
				this.photoURL = localStorage.getItem('picture');
				this.rootPage = HomePage;
				this.events.subscribe('homeLoaded', (res) => {
					this.homeLoaded = res
					if (this.homeLoaded) {
						this.name = localStorage.getItem('name');
						this.photoURL = localStorage.getItem('picture');
					}
				})
			}
			else {
				this.rootPage = LoginPage;			
			}
			this.statusBar.styleBlackTranslucent();
			this.splashScreen.hide();
		});
	}

	ionViewDidLoad(){
		if (localStorage.getItem('uid')) {
			this.name = localStorage.getItem('name');
			this.photoURL = localStorage.getItem('picture');
			this.rootPage = HomePage;
			this.events.subscribe('homeLoaded', (res) => {
				this.homeLoaded = res
				if (this.homeLoaded) {
					this.name = localStorage.getItem('name');
					this.photoURL = localStorage.getItem('picture');
					this.native.alert('testtest', this.name + ' ' + this.photoURL, 'OK');
				}
			})
		}
		else {
			this.rootPage = LoginPage;
		}
	}
	openPage(page) {
		// Reset the content nav to have just this page
		// we wouldn't want the back button to show in this scenario
		this.nav.setRoot(page.component);
	}
}
