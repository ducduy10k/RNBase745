export interface Product {
  id: number | string;
  name: string;
  description: string;
  roasted: string;
  ingredients: string;
  prices: {size: string; price: string | number; currency: string}[];
  average_rating: number | string;
  ratings_count: string;
  favourite: boolean;
  type: string;
  displayOrder: number | string;
  image: string;
  discount?: number;
  discountType: '%' | 'k' | '₫';
  shop: Shop;
}

export interface Shop {
  id: number | string;
  name: string;
  logo: string;
  location: {latitude: number; longitude: number};
  status: string;
  totalProduct: number;
  totalReview: number;
  products?: Product[]
}
