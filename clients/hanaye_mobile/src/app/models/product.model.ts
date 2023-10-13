import { Store } from "./store.model";
import { User } from "./user.model";

export class Product {
  id?: string
  woker?: User
  store!: Store
  title!: string
  price!: number
  details?: string
  active?: boolean
  isfavorite?: boolean
  image?: string
  images?: string[]
  createdAt?: string
  updatedAt?: string
}

export class Favorites {
  items!: FavoriteItem[];
}

export class FavoriteItem {
  productId!: string;
  product?: Product
}

export class FavoriteItemDetailed {
  product!: any;
  quantity!: number;
}
