import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ImagenesService } from 'src/app/services/imagenes.service';

@Component({
  selector: 'app-cosas-lindas',
  templateUrl: './cosas-lindas.page.html',
  styleUrls: ['./cosas-lindas.page.scss'],
})
export class CosasLindasPage implements OnInit {

  @Input() opcion! : number;
  cargando:boolean = true;
  cosasLindas:any = [];
  constructor(public auth: AuthService, private imageService: ImagenesService, private firestore: FirestoreService, private router: Router) { }

  ngOnInit() {

    setTimeout(() => {
      this.firestore.traerCosasLindas().subscribe( data => {
        this.cosasLindas = data;
        this.cargando = false;
      })
    }, 2000);
    

  }

  subirFoto(){
    let hora = new Date();
  
    let foto : any = {
      pathFoto : "",
      email : this.auth.actualEmail,
      hora : hora.getFullYear(),
      date : '',
      likes : []
    }
    
    this.imageService.addNewToGallery(foto, 1).then((data) =>{
      this.cargando = true;
      setTimeout(() => {
        this.cargando = false;
      }, 4000);
    });
  }

  cambiarLike(foto : any,i : any)
  {
    
      this.modificarFoto('cosasLindas',foto,i);
    
  }

  
  modificarFoto(coleccion : string,foto : any, i : any)
  {
    let element = document.getElementById(i);

    let elementStyle = window.getComputedStyle(element!);
    let elementColor = elementStyle.getPropertyValue('color');
    
    if(elementColor == "rgb(209, 37, 37)")
    {
      foto.likes = foto.likes.filter((like : string) => like != this.auth.actualEmail);   
    }
    else
    {
      foto.likes.push(this.auth.actualEmail);
    }

    this.firestore.modificarFoto(foto,foto.id,coleccion);
  } 

  cerrarSesion(){
    this.auth.logout();
    this.router.navigateByUrl('auth');
  }

}


