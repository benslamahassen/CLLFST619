import { AboutPage } from './../pages/about/about';
import { ProfilePage } from './../pages/profile/profile';
import { LoginEmailPage } from './../pages/login-email/login-email';
import { nativeService } from './../service/native/native.service';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { SignupPage } from './../pages/signup/signup';
import { LoginPage } from './../pages/login/login';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';

// New imports to update based on AngularFire2 version 4
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { Facebook } from '@ionic-native/facebook';

export const firebaseConfig = {
  apiKey: "AIzaSyCVG6YiQfPRCneOhYamqmpQFzxFJ1oCuO4",
  authDomain: "cllfst-d3498.firebaseapp.com",
  databaseURL: "https://cllfst-d3498.firebaseio.com",
  projectId: "cllfst-d3498",
  storageBucket: "cllfst-d3498.appspot.com",
  messagingSenderId: "28930317512"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    LoginEmailPage,
    ProfilePage,
    AboutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Facebook,
    nativeService,
    BarcodeScanner,
    AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
