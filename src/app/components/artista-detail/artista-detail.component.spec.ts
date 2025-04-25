import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ArtistasService } from '../../services/artistas.service';
import { ArtistaDetailComponent } from './artista-detail.component';
import { of } from 'rxjs';

describe('ArtistaDetailComponent', () => {
  let component: ArtistaDetailComponent;
  let fixture: ComponentFixture<ArtistaDetailComponent>;
  let mockArtistasService: jasmine.SpyObj<ArtistasService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockArtistasService = jasmine.createSpyObj('ArtistasService', [
      'login', // Asegúrate de incluir 'login'
      'setToken',
      'createArtista',
      'getPaises',
    ]);
    
    mockArtistasService.login.and.returnValue(of({ access_token: 'mock-token' }));
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, ArtistaDetailComponent],
      providers: [
        { provide: ArtistasService, useValue: mockArtistasService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ArtistaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    const form = component.artistaForm;
    expect(form.value).toEqual({
      nombre: '',
      genero: '',
      nacimiento: '',
      anio_debut: '',
      paisId: '',
    });
  });

  it('should validate required fields', () => {
    const form = component.artistaForm;
    form.controls['nombre'].setValue('');
    form.controls['genero'].setValue('');
    expect(form.controls['nombre'].valid).toBeFalse();
    expect(form.controls['genero'].valid).toBeFalse();
  });

  it('should call createArtista and navigate on form submission', () => {
    mockArtistasService.createArtista.and.returnValue(of({}));
    mockRouter.navigate.and.returnValue(Promise.resolve(true)); 
  
    component.artistaForm.setValue({
      nombre: 'Artista Prueba',
      genero: 'Pop',
      nacimiento: '1990-01-01',
      anio_debut: 2010,
      paisId: 1,
    });
  
    component.onSubmit();
  
    expect(mockArtistasService.createArtista).toHaveBeenCalledWith({
      nombre: 'Artista Prueba',
      genero: 'Pop',
      nacimiento: '1990-01-01',
      anio_debut: 2010,
      paisId: 1,
    });
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });
});