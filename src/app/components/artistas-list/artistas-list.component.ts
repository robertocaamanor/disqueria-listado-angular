import { Component, OnInit } from '@angular/core';
import { ArtistasService } from '../../services/artistas.service';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { EditArtistaModalComponent } from '../edit-artista-modal/edit-artista-modal.component';


@Component({
  selector: 'app-artistas-list',
  templateUrl: './artistas-list.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class ArtistasListComponent implements OnInit {
  artistas: any[] = [];

  constructor(private artistasService: ArtistasService, private router: Router, private modalService: NgbModal) {}

  navigateToCreate(): void {
    this.router.navigate(['/crear-artista']);
  }

  openEditModal(artista: any): void {
    const modalRef = this.modalService.open(EditArtistaModalComponent);
    
    modalRef.componentInstance.artista = artista; // Pasa el artista al modal
    modalRef.result.then((updatedArtista) => {
      if (updatedArtista) {
        // Actualiza la lista de artistas si se editó correctamente
        const index = this.artistas.findIndex(a => a.id === updatedArtista.id);
        if (index !== -1) {
          this.artistas[index] = updatedArtista;
        }
      }
    }).catch(() => {
      // Manejo de cierre del modal sin cambios
    });
  }

  confirmDelete(id: number): void {
    const confirmacion = window.confirm('¿Está seguro de que desea eliminar este artista?');
    if (confirmacion) {
      this.artistasService.login().subscribe((response) => {
        const token = response.access_token; // Asegúrate de que el token venga en esta propiedad
        this.artistasService.setToken(token);
  
        // Luego, obtener la lista de artistas
        this.artistasService.deleteArtista(id).subscribe(() => {
          alert('Artista eliminado con éxito');
          this.artistas = this.artistas.filter(artista => artista.id !== id); // Actualiza la lista local
        }, (error) => {
          console.error('Error al eliminar el artista:', error);
          alert('Ocurrió un error al intentar eliminar el artista.');
        });
      });
    }
  }

  ngOnInit(): void {
    // Primero, autenticar y obtener el token
    this.artistasService.login().subscribe((response) => {
      const token = response.access_token; // Asegúrate de que el token venga en esta propiedad
      this.artistasService.setToken(token);

      // Luego, obtener la lista de artistas
      this.artistasService.getArtistas().subscribe((data) => {
        this.artistas = data;
        console.log(this.artistas);
      });
    });
  }
}