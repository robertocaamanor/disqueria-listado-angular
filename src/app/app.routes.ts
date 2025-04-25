import { Routes } from '@angular/router';
import { ArtistasListComponent } from './components/artistas-list/artistas-list.component';
import { ArtistaDetailComponent } from './components/artista-detail/artista-detail.component';

export const routes: Routes = [
    { path: '', component: ArtistasListComponent },
    { path: 'crear-artista', component: ArtistaDetailComponent },
  ];
  
