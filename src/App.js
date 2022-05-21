import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Classes from "./routes/Classes";
import Todos from "./routes/Todos";
import Home from './routes/Home'
import Login from './routes/Login'
import Class from "./routes/Class";
import Post from "./routes/Post";
import CreateClassRoom from "./routes/CreateClassRoom";

function App() {

  const [userId, setUserId] = useState(localStorage.getItem('user_id'))

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={userId?<Classes />:<Login/>} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/todos" element={<Todos />} />
        <Route path="/class/:class_id" element={<Class />} />
        <Route path="/class/:class_id/post/:post_id" element={<Post />} />
        <Route path="/create" element={<CreateClassRoom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
