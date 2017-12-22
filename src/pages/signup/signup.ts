import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

import { nativeService } from './../../service/native/native.service';
import { User } from './../../models/user.model';

import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  user = {} as User
  private defaultUserPic = "https://www.google.tn/imgres?imgurl=http%3A%2F%2Fwww.abc.net.au%2Fnews%2Fimage%2F8314104-1x1-940x940.jpg&imgrefurl=http%3A%2F%2Fwww.abc.net.au%2Fnews%2F2017-03-01%2Fgeneric-facebook-looking-avatar%2F8314128&docid=u6UbkGqLXXGWzM&tbnid=0tu08Rlmhsb4iM%3A&vet=1&w=940&h=940&safe=off&bih=638&biw=1366&ved=0ahUKEwjA2uTjtfjWAhXLHJoKHUO6AfMQxiAIHCgE&iact=c&ictx=1";
  constructor(public navCtrl: NavController,
    private afauth: AngularFireAuth,
    private db: AngularFireDatabase,
    private native: nativeService,
    public menu: MenuController) {
      this.menu.enable(false, 'menu');
      
  }

  signUp(user: User) {
    this.afauth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then((fbuser: firebase.User) => {
          this.db.object('/users/' + fbuser.uid).update({
            name: user.name,
            email: user.email,
            picUrl: this.defaultUserPic,
            prodvider: "Email",
          })
          
          this.navCtrl.pop();
      })
      .catch(e => {
        this.native.alert('Error', e, 'Dismiss');
      })
  }
}
