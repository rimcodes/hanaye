import { Category } from "./category.model";
import { User } from "./user.model";

export class Service {
  id!: string;
  user!: User;
  category!: Category;
  title!: string;
  details?: string;
  active?: boolean;
  image?: string;
  images?: string[];
  createdAt?: string;
  updatedAt?: string;
}
