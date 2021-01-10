import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MarvelService } from '../services/marvel.service';
import { Comic } from '../interfaces/comic';

@Component({
  selector: 'app-hq-details',
  templateUrl: './hq-details.component.html',
  styleUrls: ['./hq-details.component.scss']
})
export class HqDetailsComponent implements OnInit {

  comic: Comic;
  lastPrice: number;

  showError = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private marvelService: MarvelService
  ) { }

  ngOnInit(): void {
    const characterId = this.activatedRoute.snapshot.paramMap.get('id');

    this.getComic(characterId);
  }

  getComic(id: string): void {
    this.marvelService.getCharacterComics(id).subscribe(
      resp => {
        let lastPrice = 0;
        let lastComic: Comic;

        resp.data.results.map(comic => {
          comic.prices.map(price => {
            if (price.price > lastPrice) {
              lastPrice = price.price;

              lastComic = comic;
            }
          });
        });

        this.comic = lastComic;
        this.lastPrice = lastPrice;
      },
      () => {
        this.showError = true;
      }
    );
  }

}
