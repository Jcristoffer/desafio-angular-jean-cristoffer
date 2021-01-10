import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { of } from 'rxjs';

import { HqDetailsComponent } from './hq-details.component';
import { MarvelService } from '../services/marvel.service';

describe('HqDetailsComponent', () => {
  let component: HqDetailsComponent;
  let fixture: ComponentFixture<HqDetailsComponent>;
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
      declarations: [ HqDetailsComponent ],
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
    fixture = TestBed.createComponent(HqDetailsComponent);
    marvelService = TestBed.inject(MarvelService);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
