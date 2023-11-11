import { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Home from "./components/home";
import Content from "./components/content";
import Cube from "./components/cube";
import FL from "./components/fl";
import OLL from "./components/oll";
import PLL from "./components/pll";
import LOGIN from "./components/login";
import REGISTER from "./components/register";
import EDIT from "./components/edit";
import ADDFL from "./components/addFl";
import ADD from "./components/add";
import ADDOLL from "./components/addoll";
import ADDPLL from "./components/addpll";
import Logout from "./components/logout";
import Need from "./components/need";
import Dashboard from "./components/dashboard";

function App() {
  const [login, setLogin] = useState(localStorage.getItem("login"));

  const handleLogout = () => {
    localStorage.setItem("login", "false");
    setLogin("false");
  };
  return (
    <div>
      {login === "false" ? (
        <div className="lr__div">
          <Link to="/login">
            <button className="login lr__button">LOGIN</button>
          </Link>
          <Link to="/register">
            <button className="register lr__button">REGISTER</button>
          </Link>
        </div>
      ) : (
        <div className="logout__div">
          <Logout onLogout={handleLogout} />
        </div>
      )}
      <nav>
        <ul className="nav__ul">
          <li>
            <Link to="/">
              <Cube />
            </Link>
          </li>
          <li>
            <Link to="/content">ALGORITHMS</Link>
          </li>
          <li>
            {login === "false" ? (
              <Link to="/needToLogin">DASHBOARD</Link>
            ) : (
              <Link to="/dashboard">DASHBOARD</Link>
            )}
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/content" element={<Content />}></Route>
        <Route path="/fl" element={<FL />}></Route>
        <Route path="/login" element={<LOGIN />}></Route>
        <Route path="/oll" element={<OLL />}></Route>
        <Route path="/needToLogin" element={<Need />}></Route>
        <Route path="/pll" element={<PLL />}></Route>
        <Route path="/addoll" element={<ADDOLL />}></Route>
        <Route path="/register" element={<REGISTER />}></Route>
        <Route path="/addFl" element={<ADDFL />}></Route>
        <Route path="/add" element={<ADD />}></Route>
        <Route path="/edit" element={<EDIT />}></Route>
        <Route path="/addpll" element={<ADDPLL />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Routes>
    </div>
  );
}
export default App;
