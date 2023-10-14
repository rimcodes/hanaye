import { User } from "./user.model";

export class Category {
  id!: string;
  title!: string;
  details?: string;
  active?: boolean;
  image?: string;
  images?: string[];
  createdAt?: string;
  updatedAt?: string;
}
