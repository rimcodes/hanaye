import { Store } from "./store.model";

export class Product {
  id?: string
  store!: Store
  title!: string
  price!: number
  details?: string
  active?: boolean
  image?: string
  images?: string[]
  createdAt?: string
  updatedAt?: string
}

export class Favorites {
  items!: FavoriteItem[];
}

export class FavoriteItem {
  serviceId!: string;
  product?: Product
}

export class FavoriteItemDetailed {
  product!: any;
  quantity!: number;
}
