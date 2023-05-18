import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { getStorage, ref, uploadString } from "firebase/storage";
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { AuthService } from './auth.service';
import { FirestoreService } from './firestore.service';




@Injectable({
  providedIn: 'root'
})
export class ImagenesService {

  constructor(private authService: AuthService, private storage: AngularFireStorage, private firestore: FirestoreService) { }

  public async addNewToGallery(foto : any, tema : number) {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      quality: 100,
      webUseInput: true
    });

    

    let date = new Date().getTime();

    let nombre = `${this.authService.actualEmail}_${date}`;

    let fecha = new Date();

    let fechaFinal = String(fecha.getDate()).padStart(2, '0') + '/' + String(fecha.getMonth() + 1).padStart(2, '0') + '/' + fecha.getFullYear() + " " + fecha.getHours() + ":" + fecha.getMinutes();
    
    const tiempo = new Date().getTime();   
    const fechaNueva = new Date(tiempo);    
    const fechaParseada = fechaNueva.toString();



    foto.date = fechaParseada;

    foto.hora = fechaFinal;

    const storage = getStorage();

    const storageRef = ref(storage,nombre);

    console.log(capturedPhoto);
    const imageRef = this.storage.ref(`${nombre}`);


    const uploadTask = imageRef.putString(capturedPhoto.dataUrl!,'data_url').then(()=>{
      imageRef.getDownloadURL().subscribe(path =>{
        foto.pathFoto = path;
        this.firestore.agregarFoto(foto,tema);
      })
    });

  }
}
