import { useState } from "react";
import { BrowserRouter, Routes, Route, Redirect } from "react-router-dom";
import Home from './Home'
import Login from './Login'

function App() {

  const [userId, setUserId] = useState(localStorage.getItem('user_id'))

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={userId?<Home />:<Login/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
