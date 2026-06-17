import { BrowserRouter, Route, Routes } from "react-router-dom";
import BooksList from "./pages/BooksList";
import BooksDetails from "./pages/BooksDetails";
import AddBooks from "./pages/AddBooks";
import Favorites from "./pages/Favorites";
import { lazy } from "react";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<BooksList />}></Route>
        {/* lazy load */}
        <Route
          path='/books:id'
          element={lazy(() => import("./pages/BooksDetails"))}
        ></Route>
        <Route path='/add' element={<AddBooks />}></Route>
        <Route path='/favorites' element={<Favorites />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
