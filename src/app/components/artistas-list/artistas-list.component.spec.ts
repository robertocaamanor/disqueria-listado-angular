import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArtistasListComponent } from './artistas-list.component';
import { ArtistasService } from '../../services/artistas.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('ArtistasListComponent', () => {
  let component: ArtistasListComponent;
  let fixture: ComponentFixture<ArtistasListComponent>;
  let mockArtistasService: jasmine.SpyObj<ArtistasService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockModalService: jasmine.SpyObj<NgbModal>;

  beforeEach(async () => {
    mockArtistasService = jasmine.createSpyObj('ArtistasService', ['login', 'setToken', 'getArtistas', 'deleteArtista']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockModalService = jasmine.createSpyObj('NgbModal', ['open']);

    await TestBed.configureTestingModule({
      imports: [ArtistasListComponent], // Cambiado de declarations a imports
      providers: [
        { provide: ArtistasService, useValue: mockArtistasService },
        { provide: Router, useValue: mockRouter },
        { provide: NgbModal, useValue: mockModalService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ArtistasListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to create artist page', () => {
    component.navigateToCreate();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/crear-artista']);
  });

  it('should open edit modal and update artist list on success', () => {
    const mockArtista = { id: 1, nombre: 'Artista 1' };
    const updatedArtista = { id: 1, nombre: 'Artista Actualizado' };
    const modalRef = { componentInstance: {}, result: Promise.resolve(updatedArtista) };
    mockModalService.open.and.returnValue(modalRef as any);

    component.artistas = [mockArtista];
    component.openEditModal(mockArtista);

    modalRef.result.then(() => {
      expect(component.artistas[0]).toEqual(updatedArtista);
    });
  });

  it('should handle modal dismissal without changes', async () => {
    const mockArtista = { id: 1, nombre: 'Artista 1' };
    const modalRef = { componentInstance: {}, result: Promise.reject() };
    mockModalService.open.and.returnValue(modalRef as any);

    component.artistas = [mockArtista];
    component.openEditModal(mockArtista);

    await modalRef.result.catch(() => {
      expect(component.artistas[0]).toEqual(mockArtista);
    });
  });

  it('should confirm and delete artist', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    const mockArtista = { id: 1, nombre: 'Artista 1' };
    component.artistas = [mockArtista];

    mockArtistasService.login.and.returnValue(of({ access_token: 'mock-token' }));
    mockArtistasService.deleteArtista.and.returnValue(of({}));

    component.confirmDelete(1);

    expect(mockArtistasService.login).toHaveBeenCalled();
    expect(mockArtistasService.setToken).toHaveBeenCalledWith('mock-token');
    expect(mockArtistasService.deleteArtista).toHaveBeenCalledWith(1);
    expect(component.artistas.length).toBe(0);
  });

  it('should handle error when deleting artist', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    const mockArtista = { id: 1, nombre: 'Artista 1' };
    component.artistas = [mockArtista];

    mockArtistasService.login.and.returnValue(of({ access_token: 'mock-token' }));
    mockArtistasService.deleteArtista.and.returnValue(throwError(() => new Error('Error al eliminar')));

    spyOn(window, 'alert');

    component.confirmDelete(1);

    expect(mockArtistasService.login).toHaveBeenCalled();
    expect(mockArtistasService.setToken).toHaveBeenCalledWith('mock-token');
    expect(mockArtistasService.deleteArtista).toHaveBeenCalledWith(1);
    expect(window.alert).toHaveBeenCalledWith('Ocurrió un error al intentar eliminar el artista.');
  });

  it('should fetch artists on initialization', () => {
    const mockArtistas = [{ id: 1, nombre: 'Artista 1' }];
    mockArtistasService.login.and.returnValue(of({ access_token: 'mock-token' }));
    mockArtistasService.getArtistas.and.returnValue(of(mockArtistas));

    component.ngOnInit();

    expect(mockArtistasService.login).toHaveBeenCalled();
    expect(mockArtistasService.setToken).toHaveBeenCalledWith('mock-token');
    expect(mockArtistasService.getArtistas).toHaveBeenCalled();
    expect(component.artistas).toEqual(mockArtistas);
  });
});