import { useBooks } from "@/api/quires/getBook.query";
import PageLayout from "@/components/layout/PageLayout";
import { Link } from "react-router-dom";

function BooksList() {
  const { data } = useBooks();
  return (
    <PageLayout>
      <div className='grid grid-cols-4 gap-4'>
        {data?.map((book: any) => (
          <div key={book.id} className='border rounded p-4'>
            <img src={book.cover} alt={book.title} />
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <p>{book.year}</p>
            <Link to={`/books/${book.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}

export default BooksList;
