import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={}></Route>
        <Route path='/books:id' element={}></Route>
        <Route path='/add' element={}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
