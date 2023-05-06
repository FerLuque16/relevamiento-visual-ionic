import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  user:string = '';
  pass: string = '';
  screen: any = 'signin';
  formData: FormGroup;
  isLoading: boolean = false;

  constructor(private authService:AuthService,private fb:FormBuilder, private auth:AuthService, private router:Router) {
    this.formData = this.fb.group({
      name: ['',[Validators.required]],
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(6)]],
    });
   }


  ngOnInit() {
  }

  async login(){
    try {
      await this.authService.login(this.formData.value.email,this.formData.value.password);
      this.router.navigate(['/home']);

    } catch{
      console.log("Error");
    }
  }

  async register(){

  }

  presionado(event:any){
    console.log(event);
  }

  completarDatos(user:string,contraseña:string){
    this.formData.controls['email'].patchValue(user);
    this.formData.controls['password'].patchValue(contraseña);
    
  }
}
