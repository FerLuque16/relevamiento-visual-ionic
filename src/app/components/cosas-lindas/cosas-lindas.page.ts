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

        
        this.cosasLindas.sort(this.ordenarLista);

        console.log(this.cosasLindas);
        this.cargando = false;
      })
    }, 2000);
    

  }

  subirFoto(){
    let hora = new Date();
  
    let foto  = {
      pathFoto : "",
      email : this.auth.actualEmail,
      hora : hora.getFullYear(),
      date : 0,
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

  ordenarLista(foto1 : any,foto2 : any)
  {
    let foto1Array : string[];
    let foto2Array : string[];
    let fecha1 : any;
    let fecha2 : any;
    let hora1 : any;
    let hora2 : any;

    let fechaNumeros1 : number[] = [];
    let fechaNumeros2 : number[] = [];
    let horaNumeros1 : number[] = [];
    let horaNumeros2 : number[] = [];
    foto1Array = foto1.hora.split(' ');
    foto2Array = foto2.hora.split(' ');

    fecha1 = foto1Array[0].split('/');
    fechaNumeros1.push(parseInt(fecha1[0]));
    fechaNumeros1.push(parseInt(fecha1[1]));
    fechaNumeros1.push(parseInt(fecha1[2]));
    fecha1 = fechaNumeros1;

    fecha2 = foto2Array[0].split('/');
    fechaNumeros2.push(parseInt(fecha2[0]));
    fechaNumeros2.push(parseInt(fecha2[1]));
    fechaNumeros2.push(parseInt(fecha2[2]));
    fecha2 = fechaNumeros2;

    hora1 = foto1Array[1].split(':');
    horaNumeros1.push(parseInt(hora1[0]));
    horaNumeros1.push(parseInt(hora1[1]));
    hora1 = horaNumeros1;

    hora2 = foto2Array[1].split(':');
    horaNumeros2.push(parseInt(hora2[0]));
    horaNumeros2.push(parseInt(hora2[1]));
    hora2 = horaNumeros2;

    if(fecha1[0] > fecha2[0] && fecha1[1] == fecha2[1] && fecha1[2] == fecha2[2])
    {
      return -1;
    }
    else
    {
      if(fecha1[1] > fecha2[1] && fecha1[2] == fecha2[2])
      {
        return -1;
      }
      else
      {
        if(fecha1[2] > fecha2[2])
        {
          return -1;
        }
        else
        {
          if(fecha1[0] == fecha2[0] && fecha1[1] == fecha2[1] && fecha1[2] == fecha2[2])
          {
            if(hora1[0] > hora2[0])
            {
              return -1;
            }
            else
            {
              if(hora1[0] == hora2[0] && hora1[1] > hora2[1])
              {
                return -1;
              }
              else
              {
                if(hora1[0] < hora2[0])
                {
                  return 1;
                }
              }
            }
          }
        }
      }
    }

    return 0;

  }

}


