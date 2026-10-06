import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Diario from "./components/Diario";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/diario" element={<Diario />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;