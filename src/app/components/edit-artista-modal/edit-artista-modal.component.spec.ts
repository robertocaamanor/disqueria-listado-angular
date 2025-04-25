import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditArtistaModalComponent } from './edit-artista-modal.component';

describe('EditArtistaModalComponent', () => {
  let component: EditArtistaModalComponent;
  let fixture: ComponentFixture<EditArtistaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditArtistaModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditArtistaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
