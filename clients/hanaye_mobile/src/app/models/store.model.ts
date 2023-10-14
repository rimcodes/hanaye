import { User } from "./user.model"

export class Store {
  id?: string
  name!: string
  worker?: User
  details?: string
  active?: boolean
  location?: string
  image?: string
  images?: string[]
  createdAt?: string
  updatedAt?: string
}
