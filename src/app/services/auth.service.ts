import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuario: any;
  actualPassword:string = "";
  // actualEmail:string="";
  actualEmail:string="invitado@invitado.com";
  isUserLogged:boolean = false;

  constructor(private afAuth: AngularFireAuth, private router:Router) { }

  registrar(email:string,password:string){
    return  this.afAuth
            .createUserWithEmailAndPassword(email,password)
            .then(result =>{
              this.usuario = result.user;
            })
  }

  login(email:string,password:string){

    try {
      return  this.afAuth.signInWithEmailAndPassword(email,password)
            .then( async result =>{
                this.actualPassword = password;
                this.actualEmail = email;
                console.log("Estas logueado");
                this.afAuth.authState.subscribe(data =>{
                  console.log(data);
                })
            })  
    } catch (error) {
      this.actualPassword = '';
      this.actualEmail = 'admin@admin.com';
      throw(error)
    }
    
  }

  logout(){
    this.actualEmail = "";
    this.isUserLogged = false;
    return this.afAuth.signOut();
  }

  getUserLogged(){
    return this.afAuth.authState;
  }
}
