import { Component, OnInit } from '@angular/core';
import { GeolocationService } from '../../services/geolocation.service'; // <-- Usamos tu servicio
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from '@ionic/angular';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.page.html',
  styleUrls: ['./nosotros.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
  ],
})
export class NosotrosPage implements OnInit {
  distancia: string = 'Calculando...';

  // Coordenadas de la oficina
  oficinaLat = 40.4452;
  oficinaLon = -3.6115;

  constructor(private geolocationService: GeolocationService) {}

  async ngOnInit() {
    try {
      const coords = await this.geolocationService.getCurrentPosition();

      const distanciaKm = this.calcularDistancia(
        coords.latitude,
        coords.longitude,
        this.oficinaLat,
        this.oficinaLon
      );

      // Solo guardamos el número (con un decimal), el "km" ya está en el HTML
      this.distancia = distanciaKm.toFixed(1); 

    } catch (error) {
      this.distancia = 'Error de GPS';
    }
  }

  // 13. Fórmula Haversine ajustada a la guía
  private calcularDistancia(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
}