import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={}></Route>
        <Route path='/books:id' element={}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
