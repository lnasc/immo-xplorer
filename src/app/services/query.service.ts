import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Query } from '../models';

@Injectable({
  providedIn: 'root'
})
export class QueryService {
  private baseUrl = 'https://immo-xplore-api.azurewebsites.net/';

  constructor(private httpClient: HttpClient) {
  }

  public createQuery(query: Query): Observable<Query> {
    return this.httpClient.post<Query>(
      `${this.baseUrl}/api/queries`, query);
  }

  public retrieveDefaultQuery(): Observable<Query> {
    return this.httpClient.get<Query>(
      `${this.baseUrl}/api/queries/default`);
  }
}
