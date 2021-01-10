import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { of, throwError } from 'rxjs';

import { CharacterDetailsComponent } from './character-details.component';
import { MarvelService } from '../services/marvel.service';

describe('CharacterDetailsComponent', () => {
  let component: CharacterDetailsComponent;
  let fixture: ComponentFixture<CharacterDetailsComponent>;
  let marvelService: MarvelService;

  const marvelResponse: any = {
    data: {
      total: 0,
      results: [
        {}
      ]
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharacterDetailsComponent],
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        MatGridListModule,
        MatCardModule,
        MatButtonModule,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterDetailsComponent);
    marvelService = TestBed.inject(MarvelService);

    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should consult the character details', () => {
    spyOn(marvelService, 'getCharacterDetails').and.returnValue(of(marvelResponse));

    component.ngOnInit();

    expect(component.character).toBeDefined();
  });

  it('you should set showError to true', () => {
    spyOn(marvelService, 'getCharacterDetails').and.returnValue(throwError(null));

    component.ngOnInit();

    expect(component.showError).toBeTruthy();
  });
});
