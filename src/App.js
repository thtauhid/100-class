import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Classes from "./routes/Classes";
import Todos from "./routes/Todos";
import Home from './routes/Home'
import Login from './routes/Login'
import Class from "./routes/Class";
import Post from "./routes/Post";

function App() {

  const [userId, setUserId] = useState(localStorage.getItem('user_id'))

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={userId?<Classes />:<Login/>} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/todos" element={<Todos />} />
        <Route path="/class/*" element={<Class />} />
        <Route path="/post/*" element={<Post />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
