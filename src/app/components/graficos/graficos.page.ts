import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js/auto'
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';


@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.page.html',
  styleUrls: ['./graficos.page.scss'],
})
export class GraficosPage implements OnInit {

  barChart: any;
  tortaChart: any;
  cosasLindas: any = [];
  cosasFeas: any = [];
  labelsFeos: any = [];
  labelsLindos: any = [];
  cantLikesFeos: any = [];
  cantLikesLindos: any = [];
  fotosFeas:any = [];
  fotosLindas:any = [];
  mostrarImagen = false;
  imagenParaMostrar:string = "";
  @ViewChild('barCanvas') private barCanvas!: ElementRef;
  @ViewChild('torCanvas') private torCanvas!: ElementRef;
  constructor(private firestore: FirestoreService, public auth: AuthService, private router:Router) { }

  ngOnInit() {
    this.firestore.traerCosasLindas().subscribe(value => {
      this.cosasLindas = value;
      
      this.cargarChartLindos();
    });
    this.firestore.traerCosasFeas().subscribe(value => {
      this.cosasFeas = value;
      
      this.cargarChartFeos(); 
    });
  }
  graficoTortas() {
    this.tortaChart = new Chart(this.torCanvas.nativeElement, {
      type: 'pie',
      data: {
        labels: this.labelsLindos,
        datasets: [{
          label: '# numero de Me gusta',
          data: this.cantLikesLindos,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Cosas Lindas'
          }
        }
      },
    });

    this.tortaChart.destroy();
    this.tortaChart = new Chart(this.torCanvas.nativeElement, {
      type: 'pie',
      data: {
        labels: this.labelsLindos,
        datasets: [{
          label: '# numero de Me gusta',
          data: this.cantLikesLindos,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Cosas Lindas'
          }
        }
      },
    });

  }



  graficoBarras() {

    console.log(this.cantLikesFeos);
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: this.labelsFeos,
        datasets: [{
          label: '# numero de Me gusta',
          data: this.cantLikesFeos,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
              beginAtZero: true
          }
        }
      }
    });

    this.barChart.destroy();
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: this.labelsFeos,
        datasets: [{
          label: '# numero de Me gusta',
          data: this.cantLikesFeos,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
              beginAtZero: true
          }
        }
      }
    });
  }

  cargarChartFeos() {
    let tempLabels = [];
    let tempFechas = [];
    for (let i = 0; i < this.cosasFeas.length; i++) {
      tempLabels = this.cosasFeas[i].email.split('@');
      tempFechas = this.cosasFeas[i].hora.split('/');
      this.labelsFeos.push(tempLabels[0] + ' | ' + tempFechas[0] + '/' + tempFechas[1]);
      this.cantLikesFeos.push(this.cosasFeas[i].likes.length);
      this.fotosFeas.push(this.cosasFeas[i].pathFoto);
    }
    this.graficoBarras();
  }

  cargarChartLindos() {
    let tempLabels = [];
    let tempFechas = [];
    for (let i = 0; i < this.cosasLindas.length; i++) {
      tempLabels = this.cosasLindas[i].email.split('@');
      tempFechas = this.cosasLindas[i].hora.split('/');
      this.labelsLindos.push(tempLabels[0] + ' | ' + tempFechas[0] + '/' + tempFechas[1]);
      this.cantLikesLindos.push(this.cosasLindas[i].likes.length);
      this.fotosLindas.push(this.cosasLindas[i].pathFoto);
    }
    this.graficoTortas();
  }

  cerrarSesion(){
    this.auth.logout();
    this.router.navigateByUrl('auth');
  }
}
