import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ArtistasService } from '../../services/artistas.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-artista-detail',
  templateUrl: './artista-detail.component.html',
  styleUrls: ['./artista-detail.component.css'],
  imports: [ReactiveFormsModule, CommonModule],
  standalone: true,

})
export class ArtistaDetailComponent implements OnInit {
  artistaForm: FormGroup;
  paises: any[] = [];

  constructor(
    private fb: FormBuilder,
    private artistasService: ArtistasService,
    private router: Router // Inyecta el Router
  ) {
    this.artistaForm = this.fb.group({
      nombre: ['', Validators.required],
      genero: ['', Validators.required],
      nacimiento: ['', Validators.required],
      anio_debut: [
        '',
        [Validators.required, Validators.pattern('^[0-9]+$')], // Valida que sea un número entero
      ],
      paisId: [
        '',
        [Validators.required, Validators.pattern('^[0-9]+$')], // Valida que sea un número entero
      ],
    });
  }

  ngOnInit(): void {
    this.artistasService.login().subscribe((response) => {
      const token = response.access_token; // Asegúrate de que el token venga en esta propiedad
      this.artistasService.setToken(token);

      // Luego, obtener la lista de artistas
      this.artistasService.getPaises().subscribe((data) => {
        this.paises = data;
        console.log('Paises', this.paises);
      });
    });
  }

  onSubmit(): void {
    if (this.artistaForm.valid) {
      const formValue = {
        ...this.artistaForm.value,
        anio_debut: parseInt(this.artistaForm.value.anio_debut, 10),
        paisId: parseInt(this.artistaForm.value.paisId, 10),
      };
  
      if (!this.artistasService['token']) {
        this.artistasService.login().subscribe((response) => {
          const token = response.access_token;
          this.artistasService.setToken(token);
  
          this.createArtista(formValue);
        });
      } else {
        this.createArtista(formValue);
      }
    }
  }
  
  private createArtista(artista: any): void {
    this.artistasService.createArtista(artista).subscribe(() => {
      alert('Artista añadido con éxito');
      this.router.navigate(['/']);
    });
  }
}