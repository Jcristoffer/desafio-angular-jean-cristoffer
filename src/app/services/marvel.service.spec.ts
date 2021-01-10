import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import { MarvelService } from './marvel.service';

describe('MarvelService', () => {
  let service: MarvelService;
  let httpClient: HttpClient;

  const marvelResponse = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
    
      ]
    });

    service = TestBed.inject(MarvelService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call the list of characters', () => {
    spyOn(httpClient, 'get').and.returnValue(of(marvelResponse));

    service.getCharacters().subscribe(
      resp => {
        expect(resp).toBeDefined();
            }
    )
  });

  it('should call the character details', () => {
    spyOn(httpClient, 'get').and.returnValue(of(marvelResponse));

    service.getCharacterDetails('1').subscribe(
      resp => {
        expect(resp).toBeDefined();
      }
    )
  });

  it('should call the list of comics', () => {
    spyOn(httpClient, 'get').and.returnValue(of(marvelResponse));

    service.getCharacterComics('1').subscribe(
      resp => {
        expect(resp).toBeDefined();
      }
    )
  });

  it('should generate the parameters for api', () => {
    spyOn(httpClient, 'get').and.returnValue(of(marvelResponse));

    expect(service.getParamsAPI()).toBeDefined();
  });
});
