import { Observable } from 'rxjs';
import { AdSearchResult } from '../models';

export abstract class IAdService  {
  abstract searchAds(filters: any): Observable<AdSearchResult>;
}
