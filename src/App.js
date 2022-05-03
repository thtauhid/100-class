import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Classes from "./Classes";
import Todos from "./Todos";
import Home from './Home'
import Login from './Login'

function App() {

  const [userId, setUserId] = useState(localStorage.getItem('user_id'))

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={userId?<Home />:<Login/>} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/todos" element={<Todos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
