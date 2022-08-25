import "./App.css";
import Header from "./components/Header/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import BlogAdd from "./pages/BlogAdd/BlogAdd";
import BlogDetail from "./pages/BlogDetail/BlogDetail";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/add" element={<BlogAdd />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
      </Routes>
    </div>
  );
}

export default App;
