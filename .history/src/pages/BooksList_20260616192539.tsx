import { getBooks } from "@/api/resources/getBook.api";
import PageLayout from "@/components/layout/PageLayout";
import React from "react";

function BooksList() {
  const { data } = getBooks();
  console.log(data);
  return <PageLayout>BooksList</PageLayout>;
}

export default BooksList;
