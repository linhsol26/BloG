import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/dialogs/login/login.component';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(public dialog: MatDialog, public snackBar: MatSnackBar, public afAuth: AngularFireAuth) { }
  avt = '';
  ngOnInit() {
    this.afAuth.user.subscribe((usr) => {
      if (!usr.emailVerified) {
        usr.sendEmailVerification().then(() => {
          this.afAuth.auth.signOut();
          this.snackBar.open('Please check your email to verify your account', 'OK', {duration: 5000});
        }).catch((err) => {
          this.snackBar.open(err, 'OK', {duration: 5000});
        });

      }
      this.avt = usr.photoURL;

    });
}
loginOnClick() {
    this.dialog.open(LoginComponent, {
      width: '30%',
      height: '50%'
    });
}
}
