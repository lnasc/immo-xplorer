import { IAdService } from './services/ad.service.contract';
import { Component, OnInit } from '@angular/core';

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

  constructor(private adService: IAdService) {}

  public ngOnInit(): void {
    this.adService.searchAds().subscribe(result => {
      this.searchResult = result;
      this.prepareData();
    });
  }

  private prepareData(): void {
    this.searchResult.results.forEach(ad => {
      ad.squarePrice = Math.round(ad.price / parseInt(ad.attributes.square));
    });
  }
}
