import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {SplashScreen} from '@capacitor/splash-screen';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router) {}

  ngOnInit(){
    this.router.navigateByUrl('splash');
    //  this.router.navigateByUrl('home');
    // this.router.navigateByUrl('auth');
    // this.router.navigateByUrl('cosasLindas');
    // this.router.navigateByUrl('mis-imagenes');


  }

  ionViewDitEnter(){
    SplashScreen.hide();
  }
}
