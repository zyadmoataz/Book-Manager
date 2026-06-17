import { BrowserRouter, Route, Routes } from "react-router-dom";
import BooksList from "./pages/BooksList";
import AddBooks from "./pages/AddBooks";
import Favorites from "./pages/Favorites";
import { lazy, Suspense } from "react";

const BooksDetails = lazy(() => import("./pages/BooksDetails"));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<BooksList />}></Route>
        {/* lazy load Route*/}
        <Route
          path='/books/:id'
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <BooksDetails />
            </Suspense>
          }
        ></Route>
        <Route path='/add' element={<AddBooks />}></Route>
        <Route path='/favorites' element={<Favorites />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
