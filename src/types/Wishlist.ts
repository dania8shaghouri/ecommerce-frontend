export interface WishlistProduct {
  _id: string;
  title: string;
  brand: string;
  category: string;
  image: string;
  price: number;
  stock: number;
}

export interface WishlistItem {
  _id: string;
  user: string;
  product: WishlistProduct;
}

export interface WishlistResponse {
  isWishlisted: boolean;
  message: string;
}
