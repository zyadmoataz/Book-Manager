import { BrowserRouter, Route, Routes } from "react-router-dom";
import BooksList from "./pages/BooksList";
import BooksDetails from "./pages/BooksDetails";
import AddBooks from "./pages/AddBooks";
import Favorites from "./pages/Favorites";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<BooksList />}></Route>
        <Route path='/books:id' element={<BooksDetails />}></Route>
        <Route path='/add' element={<AddBooks />}></Route>
        <Route path='/favorites' element={<Favorites />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
