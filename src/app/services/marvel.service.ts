import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Md5 } from 'ts-md5/dist/md5';

import { MarvelResponse } from '../interfaces/marvel-response';
import { Character } from '../interfaces/character';
import { Comic } from '../interfaces/comic';

@Injectable({
  providedIn: 'root'
})
export class MarvelService {

  private readonly PUBLIC_KEY = 'a9b31339116382e15cc1f23f73ed721e';
  private readonly PRIVATE_KEY = 'c50beeaac96db1d931cda6c46dfff03f8dabe530';

  private readonly BASE_URL = 'https://gateway.marvel.com/v1/public';

  constructor(
    private httpClient: HttpClient
  ) { }

  getCharacters(offset = 0): Observable<MarvelResponse<Character>> {
    const params = this.getParamsAPI();

    return this.httpClient.get<MarvelResponse<Character>>(`${this.BASE_URL}/characters?${params}&limit=20&offset=${offset}`);
  }

  getCharacterDetails(id: string): Observable<MarvelResponse<Character>> {
    const params = this.getParamsAPI();

    return this.httpClient.get<MarvelResponse<Character>>(`${this.BASE_URL}/characters/${id}?${params}`);
  }

  getCharacterComics(id: string): Observable<MarvelResponse<Comic>> {
    const params = this.getParamsAPI();

    return this.httpClient.get<MarvelResponse<Comic>>(`${this.BASE_URL}/characters/${id}/comics?${params}&limit=100`);
  }

  getParamsAPI(): string {
    const ts = new Date().getTime();
    const md5 = new Md5();

    const hash = md5.appendStr(`${ts}${this.PRIVATE_KEY}${this.PUBLIC_KEY}`).end();

    return `ts=${ts}&apikey=${this.PUBLIC_KEY}&hash=${hash}`;
  }
}
