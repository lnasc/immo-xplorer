import { Observable } from 'rxjs';
import { AdSearchResult } from '../models';

export abstract class IAdService  {
  abstract searchAds(): Observable<AdSearchResult>;
}
