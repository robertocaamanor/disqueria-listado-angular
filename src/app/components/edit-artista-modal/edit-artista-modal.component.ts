import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ArtistasService } from '../../services/artistas.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-artista-modal',
  templateUrl: './edit-artista-modal.component.html',
  styleUrls: ['./edit-artista-modal.component.css'],
  imports: [ReactiveFormsModule, CommonModule],
})
export class EditArtistaModalComponent {
  @Input() artista: any; // Recibe el artista a editar
  artistaForm: FormGroup;
  paises: any[] = [];
  

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private artistasService: ArtistasService,) {
    this.artistaForm = this.fb.group({
      nombre: ['', Validators.required],
      nacimiento: ['', Validators.required],
      anio_debut: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      paisId: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
    
  }

  ngOnInit(): void {
    this.artistasService.login().subscribe((response) => {
      const token = response.access_token; // Asegúrate de que el token venga en esta propiedad
      this.artistasService.setToken(token);
  
      // Obtén la lista de países
      this.artistasService.getPaises().subscribe((data) => {
        this.paises = data;
        console.log('Paises', this.paises);
      });
    });
  
    if (this.artista && this.artista.id) {
      // Obtén los datos del artista desde el backend
      this.artistasService.getArtistaById(this.artista.id).subscribe((data) => {
        const artistaData = {
          ...data,
          nacimiento: this.formatDateToISO(data.nacimiento),
          paisId: data.pais.id, // Extrae el id del país
        };
        this.artistaForm.patchValue(artistaData); // Carga los datos en el formulario
      });
    }
  }

  save(): void {
    if (this.artistaForm.valid) {
      const updatedArtista = {
        ...this.artista,
        ...this.artistaForm.value,
      };
  
      this.artistasService.updateArtista(this.artista.id, updatedArtista).subscribe(() => {
        alert('Artista actualizado con éxito');
        this.activeModal.close(updatedArtista); // Devuelve el artista actualizado al componente padre
      }, (error) => {
        console.error('Error al actualizar el artista:', error);
        alert('Ocurrió un error al actualizar el artista.');
      });
    }
  }

  cancel(): void {
    this.activeModal.dismiss();
  }

  private formatDateToISO(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses son base 0
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}