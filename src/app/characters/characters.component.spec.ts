import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { of, throwError } from 'rxjs';

import { CharactersComponent } from './characters.component';
import { MarvelService } from '../services/marvel.service';

describe('CharactersComponent', () => {
  let component: CharactersComponent;
  let fixture: ComponentFixture<CharactersComponent>;
  let marvelService: MarvelService;

  const marvelResponse: any = {
    data: {
      total: 0,
      results: []
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharactersComponent],
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
    fixture = TestBed.createComponent(CharactersComponent);
    marvelService = TestBed.get(MarvelService);

    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should consult the characters', () => {
    spyOn(marvelService, 'getCharacters').and.returnValue(of(marvelResponse));

    component.ngOnInit();

    expect(component.characters).toBeDefined();
    expect(component.totalCharacters).toBeDefined();
  });

  it('should consult the previous page', () => {
    spyOn(marvelService, 'getCharacters').and.returnValue(of(marvelResponse));

    component.ngOnInit();

    component.currentOffset = 40;

    component.previousPage();

    expect(component.currentOffset).toEqual(20);
  });

  it('should consult the next page', () => {
    spyOn(marvelService, 'getCharacters').and.returnValue(of(marvelResponse));

    component.ngOnInit();

    component.currentOffset = 20;
    component.totalCharacters = 100;

    component.nextPage();

    expect(component.currentOffset).toEqual(40);
  });

  it('should set showError to true', () => {
    spyOn(marvelService, 'getCharacters').and.returnValue(throwError(null));

    component.ngOnInit();

    expect(component.showError).toBeTruthy();
  });
});
