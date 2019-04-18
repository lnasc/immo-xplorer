export interface Query {
  _id?: string;
  priceRangeMin: number;
  priceRangeMax: number;
  name?: string;
  isDefault?: boolean;
}
