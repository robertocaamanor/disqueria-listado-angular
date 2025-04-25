import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistasListComponent } from './artistas-list.component';

describe('ArtistasListComponent', () => {
  let component: ArtistasListComponent;
  let fixture: ComponentFixture<ArtistasListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtistasListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtistasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
