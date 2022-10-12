export interface User {
  email: string;
  password: string;
}

export interface Offer {
  title: string;
  category: string;
  images?: string[];
  description: string;
  localization: string;
  author_id: string;
}

export interface Localization {
  postCode: string;
  place: string;
}

export interface OfferResult {
  next?: {
    page: number;
    limit: number;
  };
  previous?: {
    page: number;
    limit: number;
  };
  data?: Offer[];
}
