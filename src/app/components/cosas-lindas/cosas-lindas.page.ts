import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ImagenesService } from 'src/app/services/imagenes.service';

@Component({
  selector: 'app-cosas-lindas',
  templateUrl: './cosas-lindas.page.html',
  styleUrls: ['./cosas-lindas.page.scss'],
})
export class CosasLindasPage implements OnInit {

  cargando:boolean = false;
  constructor(private auth: AuthService, private imageService: ImagenesService) { }

  ngOnInit() {
  }

  subirFoto(){
    let hora = new Date();
  
    let foto : any = {
      pathFoto : "",
      email : this.auth.actualEmail,
      hora : hora.getFullYear(),
      likes : []
    }
    
    this.imageService.addNewToGallery(foto, 1).then((data) =>{
      this.cargando = true;
      setTimeout(() => {
        this.cargando = false;
      }, 4000);
    });
  }

}
