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
    
    foto.hora = fechaFinal;

    // const storage = getStorage();

    // const storageRef = ref(storage,nombre);

    const imageRef = this.storage.ref(`imagenes/${nombre}`);
    const byteCharacters = atob(capturedPhoto.path!);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const imageBlob = new Blob([byteArray], { type: 'image/jpeg' });

    const uploadTask = imageRef.put(imageBlob).then(()=>{
      imageRef.getDownloadURL().subscribe(path =>{
        foto.pathFoto = path;
        this.firestore.agregarFoto(foto,tema);
      })
    });

    


    // let storage = getStorage();
    // let date = new Date().getTime();
    // let nombre = `${this.authService.actualEmail} ${date}`;

    // let fecha = new Date();

    // let fechaFinal = String(fecha.getDate()).padStart(2, '0') + '/' + String(fecha.getMonth() + 1).padStart(2, '0') + '/' + fecha.getFullYear() + " " + fecha.getHours() + ":" + fecha.getMinutes();
    
    // foto.hora = fechaFinal;
    // let storageRef = ref(storage, nombre);

    // let url = this.storage.ref(nombre);


    // try {
    //    uploadString(storageRef ,capturedPhoto.dataUrl, 'data_url').then(()=>{
    //     url.getDownloadURL().subscribe((url1 : any)=>{
    //       foto.pathFoto = url1;
    //       this.firestore.agregarFoto(foto,tema);
    //     })
    //   });
      
    // } catch (error) {
    //   throw(error)
    // }
    // uploadString(storageRef ,capturedPhoto.dataUrl, 'data_url').then(()=>{
    //   url.getDownloadURL().subscribe((url1 : any)=>{
    //     foto.pathFoto = url1;
    //     this.firestore.agregarFoto(foto,tema);
    //   })
    // });
    
  }
}
