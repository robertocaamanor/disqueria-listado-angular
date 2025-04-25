import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ArtistasService } from './artistas.service';

describe('ArtistasService', () => {
  let service: ArtistasService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ArtistasService],
    });
    service = TestBed.inject(ArtistasService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch artistas from the API', () => {
    const mockArtistas = [
      { id: 1, nombre: 'Artista 1' },
      { id: 2, nombre: 'Artista 2' },
    ];

    service.getArtistas().subscribe((artistas) => {
      expect(artistas).toEqual(mockArtistas);
    });

    const req = httpMock.expectOne('http://localhost:3000/artistas');
    expect(req.request.method).toBe('GET');
    req.flush(mockArtistas);
  });
});