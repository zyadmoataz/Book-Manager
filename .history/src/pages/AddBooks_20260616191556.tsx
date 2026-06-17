import PageLayout from "@/components/layout/PageLayout";

//reactive form of adding a book
function AddBooks() {
  return (
    <PageLayout>
      <h1>Add A New Book</h1>
      <form action=''>
        <input type='text' placeholder='Title' />
        <input type='text' placeholder='Author' />
        <input type='text' placeholder='Genre' />
        <input type='text' placeholder='ISBN' />
        <input type='text' placeholder='Published Date' />
        <input type='text' placeholder='Publisher' />
        <input type='text' placeholder='Description' />
        <input type='text' placeholder='Cover Image' />
        <input type='text' placeholder='Rating' />
        <input type='text' placeholder='Review' />
      </form>
    </PageLayout>
  );
}

export default AddBooks;
