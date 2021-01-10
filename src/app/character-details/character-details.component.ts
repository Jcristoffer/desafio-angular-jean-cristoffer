import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MarvelService } from '../services/marvel.service';
import { Character } from '../interfaces/character';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss']
})
export class CharacterDetailsComponent implements OnInit {

  character: Character;

  showError = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private marvelService: MarvelService
  ) { }

  ngOnInit(): void {
    const characterId = this.activatedRoute.snapshot.paramMap.get('id');

    this.getCharacterDetails(characterId);
  }

  getCharacterDetails(id: string): void {
    this.marvelService.getCharacterDetails(id).subscribe(
      resp => {
        this.character = resp.data.results[0];
      },
      () => {
        this.showError = true;
      }
    );
  }

}
