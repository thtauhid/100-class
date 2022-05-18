import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Classes from "./routes/Classes";
import Todos from "./routes/Todos";
import Home from './routes/Home'
import Login from './routes/Login'
import Class from "./routes/Class";

function App() {

  const [userId, setUserId] = useState(localStorage.getItem('user_id'))

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={userId?<Home />:<Login/>} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/todos" element={<Todos />} />
        <Route path="/class/*" element={<Class />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
