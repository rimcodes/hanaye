import { Store } from "./store.model";
import { User } from "./user.model";

export class Product {
  id?: string
  worker?: User
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
