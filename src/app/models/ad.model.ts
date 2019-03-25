export interface AdLocation {
  region_id: string;
  region_name: string;
  department_id: string;
  department_name: string;
  city_label: string;
  city: string;
  zipcode: string;
  lat: number;
  lng: number;
  source: string;
  provider: string;
  is_shape: boolean;
}

export interface AdOwner {
  store_id: string;
  user_id: string;
  type: string;
  name: string;
  siren: string;
  pro_rates_link: string;
  no_salesmen: boolean;
}

export interface AdAttributes {
  real_estate_type: string;
  rooms: string;
  square: string;
  custom_ref: string;
  ges: string;
  energy_rate: string;
  pro_rates_link: string;
  immo_sell_type: string;
  is_import: string;
}

export interface Ad {
  title: string;
  description: string;
  category: string;
  link: string;
  images: string[];
  location: AdLocation;
  urgent: boolean;
  price: number;
  squarePrice: number;
  date: string;
  owner: AdOwner;
  attributes: AdAttributes;
  id: number;
}

export interface AdSearchResult {
  page: number;
  pages: number;
  nbResult: number;
  results: Ad[];
}
