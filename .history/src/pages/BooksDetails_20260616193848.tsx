import PageLayout from "@/components/layout/PageLayout";
import { useBookById } from "@/api/quires/getBook.query";
import { useParams } from "react-router-dom";

function BooksDetails() {
  const { id } = useParams();
  const { data } = useBookById(Number(id));

  return (
    <PageLayout>
      <h1>{data?.title}</h1>
      <p>{data?.author}</p>
      <p>{data?.year}</p>
    </PageLayout>
  );
}

export default BooksDetails;
