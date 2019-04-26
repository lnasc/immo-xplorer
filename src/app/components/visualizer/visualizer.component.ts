import { Ad } from './../../models/ad.model';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { Observable, interval } from 'rxjs';
import { first, map, switchMap, switchMapTo, tap } from 'rxjs/operators';

import { AdSearchResult } from '../../models';
import { IAdService, QueryService } from '../../services';

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

  constructor(
    private adService: IAdService,
    private queryService: QueryService) {
    }

  public ngOnInit(): void {
    this.isLoading = true;
    this.queryService.retrieveDefaultQuery()
    .pipe(
      tap(defaultQuery => {
        this.priceRangeMin = defaultQuery.priceRangeMin.toString();
        this.priceRangeMax = defaultQuery.priceRangeMax.toString();
      }),
      switchMap(x => this.searchAds()),
      first()
    ).subscribe(() => this.afterDataLoaded());
  }

  public onPriceRangeMinModelChange(value: string) {
    this.priceRangeMin = value;
    this.saveDefaultQuery();
  }

  public onPriceRangeMaxModelChange(value: string) {
    this.priceRangeMax = value;
    this.saveDefaultQuery();
  }

  public onSearchClick() {
    this.searchAds().pipe(
      first()
    ).subscribe(() => this.afterDataLoaded());
  }

  public saveDefaultQuery() {
    this.queryService.createQuery({
      priceRangeMin: parseInt(this.priceRangeMin, 10),
      priceRangeMax: parseInt(this.priceRangeMax, 10),
      isDefault: true
    })
    .pipe(first())
    .subscribe();
  }

  private prepareData(): void {
    // this.searchResult.results.forEach(ad => {
    //   ad.squarePrice = Math.round(ad.price / parseInt(ad.attributes.square, 10));
    // });
  }

  private searchAds(): Observable<AdSearchResult> {
    this.isLoading = true;
    return this.adService.searchAds({
      priceRange: {
        min: parseInt(this.priceRangeMin, 10),
        max: parseInt(this.priceRangeMax, 10)
      }
    }).pipe(
      map(response => {
        response.results = response.results.filter(ad => ad.attributes.immo_sell_type !== 'viager');
        response.nbResult = response.results.length;
        return response;
      }),
      tap(result => {
        this.searchResult = result;
        this.prepareData();
      })
    );
  }

  private afterDataLoaded() {
    this.isLoading = false;
    this.dataLoaded = true;
  }
}
