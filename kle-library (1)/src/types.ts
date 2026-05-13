export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  year: number;
  isbn: string;
  coverImage?: string;
}

export type UserRole = 'STUDENT' | 'EMPLOYEE' | 'ADMIN';
export type View = 'home' | 'blog' | 'login' | 'register';

export interface UserContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
}
