import { Service } from "./service.model";
import { User } from "./user.model";

export class Demand {
  id!: string;
  service!: Service;
  user?: User;
  client?: User;
  title?: string;
  details?: string;
  date?: string;
  status?: string;
  active!: boolean;
  location?: string;
  createdAt?: string;
  updatedAt?: string;
}
