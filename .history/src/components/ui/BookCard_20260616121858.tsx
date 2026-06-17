import { Book } from "@/types";

export default function BookCard({ book }: { book: Book }) {
  return (
    <div>
      <h3>{book.title}</h3>
      <p>{book.author}</p>
      <p>{book.year}</p>
      <p>{book.genre}</p>
      <p>{book.read}</p>
    </div>
  );
}
