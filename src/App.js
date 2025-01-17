import "./App.css";
import { Home } from "./Compo/Home";
import { Navbar } from "./Compo/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Profie } from "./Compo/Profie";
import { Login } from "./Compo/Login";
import { Signup } from "./Compo/Signup";
import { BlogState } from "./Context/BlogState";
import { BlogDetail } from "./Compo/BlogDetail";
import { BottomNavbar } from "./Compo/BottomNavbar";
import { CreateBlog } from "./Compo/CreateBlog";

function App() {
  return (
    <BlogState>
      <BrowserRouter>
        <div className="App" style={{ paddingBottom: 50 }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user/:userId" element={<Profie />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/blog/:blogId" element={<BlogDetail />} />
            <Route path="/create/" element={<CreateBlog />} />
          </Routes>
          <BottomNavbar />
        </div>
      </BrowserRouter>
    </BlogState>
  );
}

export default App;
