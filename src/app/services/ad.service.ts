import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { Observable } from 'rxjs';

import { IAdService } from '.';
import { AdSearchResult } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AdService implements IAdService {
  private baseUrl = 'http://localhost:4243';

  constructor(private httpClient: HttpClient) {}

  searchAds(): Observable<AdSearchResult> {
    return this.httpClient.get<AdSearchResult>(`${this.baseUrl}/api/ads`);
  }
}
