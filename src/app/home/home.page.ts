import { Component, ViewChild, AfterViewInit } from '@angular/core';
declare const google;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {
  sourceLocation = '';
  destinationLocation = '';
  @ViewChild('mapElement', { static: false }) mapElement;
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  ngAfterViewInit(): void {
    this.loadMapWithDirection();
  }
  constructor() {}

  loadMapWithDirection() {
    const map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 7,
      center: { lat: 41.85, lng: -87.65 },
    });

    this.directionsRenderer.setMap(map);
  }

  calculateAndDisplayRoute() {
    this.directionsService
      .route({
        origin: {
          query: this.sourceLocation,
        },
        destination: {
          query: this.destinationLocation,
        },
        travelMode: google.maps.TravelMode.DRIVING,
      })
      .then((response) => {
        this.directionsRenderer.setDirections(response);
      })
      .catch((e) => window.alert('Directions request failed due to ' + status));
  }
}
