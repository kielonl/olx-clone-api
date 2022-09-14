export interface User {
  email: string;
  password: string;
}

export interface Offer {
  title: string;
  category: string;
  images?: string[];
  description: string;
  localisation: string;
  author_id: string;
}
