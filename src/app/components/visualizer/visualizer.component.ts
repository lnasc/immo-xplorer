import { Component, OnInit } from '@angular/core';

import { AdSearchResult } from '../../models';
import { IAdService } from '../../services';

import { first, map } from 'rxjs/operators';

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.scss']
})
export class VisualizerComponent implements OnInit {

  public searchResult: AdSearchResult;
  public columnsToDisplay = ['title', 'square', 'price', 'squarePrice', 'sellType', 'city', 'date', 'link']
  public priceRangeMin = '50000';
  public priceRangeMax = '120000';
  // tslint:disable-next-line:max-line-length
  public noImageSrc='https://www.freeiconspng.com/uploads/no-image-icon-4.png';
  public dataLoaded: boolean;
  public isLoading: boolean;

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
    this.isLoading = true;
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
      this.isLoading = false;
      this.dataLoaded = true;
    });
  }

  public onSearchClick() {
    this.search();
  }

}
