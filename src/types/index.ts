export interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  genre: string;
  read: boolean;
  cover: string;
  overview?: string;
  reviews?: string[];
  tags?: { id: string; name: string }[];
}
