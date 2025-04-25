import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditArtistaModalComponent } from './edit-artista-modal.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ArtistasService } from '../../services/artistas.service';
import { of, throwError } from 'rxjs';

describe('EditArtistaModalComponent', () => {
  let component: EditArtistaModalComponent;
  let fixture: ComponentFixture<EditArtistaModalComponent>;
  let mockArtistasService: jasmine.SpyObj<ArtistasService>;
  let mockActiveModal: jasmine.SpyObj<NgbActiveModal>;

  beforeEach(async () => {
    mockArtistasService = jasmine.createSpyObj('ArtistasService', [
      'login',
      'setToken',
      'getPaises',
      'getArtistaById',
      'updateArtista',
    ]);
    mockActiveModal = jasmine.createSpyObj('NgbActiveModal', ['close', 'dismiss']);

    await TestBed.configureTestingModule({
      imports: [EditArtistaModalComponent], // Cambiado de declarations a imports
      providers: [
        { provide: ArtistasService, useValue: mockArtistasService },
        { provide: NgbActiveModal, useValue: mockActiveModal },
        FormBuilder,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditArtistaModalComponent);
    component = fixture.componentInstance;

    // Simula los métodos del servicio
    mockArtistasService.login.and.returnValue(of({ access_token: 'mock-token' }));
    mockArtistasService.getPaises.and.returnValue(of([{ id: 1, nombre: 'País 1' }]));
    mockArtistasService.getArtistaById.and.returnValue(of({
      id: 1,
      nombre: 'Artista 1',
      nacimiento: '2000-01-01',
      pais: { id: 1 },
    }));
    mockArtistasService.updateArtista.and.returnValue(of({ id: 1, nombre: 'Artista Actualizado' }));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form and fetch countries on ngOnInit', () => {
    component.ngOnInit();

    expect(mockArtistasService.login).toHaveBeenCalled();
    expect(mockArtistasService.setToken).toHaveBeenCalledWith('mock-token');
    expect(mockArtistasService.getPaises).toHaveBeenCalled();
    expect(component.paises).toEqual([{ id: 1, nombre: 'País 1' }]);
  });

  it('should fetch artist details and populate the form if artista is provided', () => {
    const mockArtista = {
      id: 1,
      nombre: 'Artista 1',
      nacimiento: '1999-12-31T23:00:00Z', // Ajusta la fecha para evitar problemas de zona horaria
      pais: { id: 1 },
    };
    component.artista = { id: 1 };
    mockArtistasService.getArtistaById.and.returnValue(of(mockArtista));
  
    component.ngOnInit();
  
    expect(mockArtistasService.getArtistaById).toHaveBeenCalledWith(1);
    expect(component.artistaForm.value).toEqual({
      nombre: 'Artista 1',
      nacimiento: '1999-12-31', // Ajusta la fecha esperada
      anio_debut: '',
      paisId: 1,
    });
  });

  it('should save the updated artist and close the modal on success', () => {
    component.artista = { id: 1 };
    component.artistaForm.setValue({
      nombre: 'Artista Actualizado',
      nacimiento: '2000-01-01',
      anio_debut: '2010',
      paisId: '1',
    });
  
    component.save();
  
    expect(mockArtistasService.updateArtista).toHaveBeenCalledWith(1, {
      id: 1,
      nombre: 'Artista Actualizado',
      nacimiento: '2000-01-01',
      anio_debut: '2010',
      paisId: '1',
    });
    expect(mockActiveModal.close).toHaveBeenCalledWith({
      id: 1,
      nombre: 'Artista Actualizado',
      nacimiento: '2000-01-01',
      anio_debut: '2010',
      paisId: '1',
    });
  });

  it('should handle error when saving artist', () => {
    spyOn(window, 'alert');
    component.artista = { id: 1 };
    component.artistaForm.setValue({
      nombre: 'Artista Actualizado',
      nacimiento: '2000-01-01',
      anio_debut: '2010',
      paisId: '1',
    });
    mockArtistasService.updateArtista.and.returnValue(throwError(() => new Error('Error al actualizar')));

    component.save();

    expect(mockArtistasService.updateArtista).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Ocurrió un error al actualizar el artista.');
  });

  it('should dismiss the modal on cancel', () => {
    component.cancel();
    expect(mockActiveModal.dismiss).toHaveBeenCalled();
  });
});