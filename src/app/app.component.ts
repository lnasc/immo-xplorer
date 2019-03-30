import { IAdService } from './services/ad.service.contract';
import { Component, OnInit } from '@angular/core';

import { first, map } from 'rxjs/operators';

import { AdSearchResult } from './models/ad.model';
import { AdMockService } from './services/ad-mock.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'immo-xplorer';
  public searchResult: AdSearchResult;
  public columnsToDisplay = ['title', 'square', 'price', 'squarePrice', 'sellType', 'city', 'date', 'link']
  public priceRangeMin = '50000';
  public priceRangeMax = '120000';

  constructor(private adService: IAdService) {}

  public ngOnInit(): void {
    this.search();
  }

  private prepareData(): void {
    // this.searchResult.results.forEach(ad => {
    //   ad.squarePrice = Math.round(ad.price / parseInt(ad.attributes.square, 10));
    // });
  }

  private search(): void {
    this.adService.searchAds({
      priceRange: {
        min: parseInt(this.priceRangeMin, 10),
        max: parseInt(this.priceRangeMax, 10)
      }
    }).pipe(
      first(),
      map(response => {
        response.results = response.results.filter(ad => ad.attributes.immo_sell_type !== 'viager');
        response.nbResult = response.results.length;
        return response;
      })
    ).subscribe(result => {
      this.searchResult = result;
      this.prepareData();
    });
  }

  public onSearchClick() {
    this.search();
  }
}
