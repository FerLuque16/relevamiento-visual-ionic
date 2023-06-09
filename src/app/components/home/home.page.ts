import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private router: Router, public auth: AuthService) { }

  ngOnInit() {
  }

  cerrarSesion(){
    this.auth.logout();
    this.router.navigateByUrl('auth');
  }

  irHacia(ruta:string){
    this.router.navigateByUrl(ruta);
  }

}
