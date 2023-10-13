export class User {
  id?: string;
  name!: string;
  password?: string;
  role!: 'client' | 'admin' | 'worker';
  active!: boolean;
  phone!: string;
  address?: string;
  image?: string;
  location?: string;
  images?: string[];
  createdAt?: string;
  updatedAt?: string;
}
