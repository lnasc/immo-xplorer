import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { AdSearchResult } from '../models/ad.model';
import data from '../../assets/data.json';

@Injectable({
  providedIn: 'root'
})
export class AdMockService {
  public searchAds(): Observable<AdSearchResult> {
    return of(data as any);
  }
}
