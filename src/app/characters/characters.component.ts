import { Component, OnInit } from '@angular/core';
import { Character } from '../interfaces/character';

import { MarvelService } from '../services/marvel.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {

  characters: Character[];
  currentOffset = 0;
  totalCharacters = 0;

  showError = false;

  constructor(
    private marvelService: MarvelService
  ) { }

  ngOnInit(): void {
    this.getCharacters();
  }

  getCharacters(): void {
    this.marvelService.getCharacters(this.currentOffset).subscribe(
      resp => {
        this.characters = resp.data.results;
        this.totalCharacters = resp.data.total;
      },
      () => {
        this.showError = true;
      }
    );
  }

  previousPage(): void {
    if (this.currentOffset > 0) {
      this.currentOffset -= 20;

      this.getCharacters();
    }
  }

  nextPage(): void {
    if (this.currentOffset < this.totalCharacters - 20) {
      this.currentOffset += 20;

      this.getCharacters();
    }
  }

}
