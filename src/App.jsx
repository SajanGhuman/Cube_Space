import "./App.css";
import { Routes, Route } from "react-router-dom";
import LR from "./components/lr";
import Navbar from "./components/navbar";
import Home from "./components/home";
import LOGIN from "./components/login";
import REGISTER from "./components/register";
import Dashboard from "./components/dashboard";
import Content from "./components/content";
import Need from "./components/need";
import ADD from "./components/add";
import EDIT from "./components/edit";
import Delete from "./components/delete";
import ADDUSER from "./components/addUser";
import Users from "./components/users";
import DeleteUsers from "./components/deleteUsers";
import EditUsers from "./components/editUsers";
import EditComment from "./components/editComment";
import DeleteComment from "./components/deleteComment";
import AddCategory from "./components/addCategory";
import ManageCategory from "./components/manageCategory";
import EditCategory from "./components/editCategory";
import DeleteCategory from "./components/deleteCategory";
import FullView from "./components/fullView";
import Logout from "./components/logoutButton";

function App() {
  return (
    <div>
      <LR />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<LOGIN />}></Route>
        <Route path="/login" element={<Logout />}></Route>
        <Route path="/register" element={<REGISTER />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/content" element={<Content />}></Route>
        <Route path="/needToLogin" element={<Need />}></Route>
        <Route path="/add" element={<ADD />}></Route>
        <Route path="/addUser" element={<ADDUSER />}></Route>
        <Route path="/edit/:algID" element={<EDIT />}></Route>
        <Route path="/delete/:algID" element={<Delete />}></Route>
        <Route path="/users" element={<Users />}></Route>
        <Route path="/deleteUsers/:userID" element={<DeleteUsers />}></Route>
        <Route path="/editUsers/:userID" element={<EditUsers />}></Route>
        <Route path="/editComment/:id" element={<EditComment />}></Route>
        <Route path="/deleteComment/:id" element={<DeleteComment />}></Route>
        <Route path="/addCategory" element={<AddCategory />}></Route>
        <Route path="/manageCategory" element={<ManageCategory />}></Route>
        <Route path="/fullView/:algID" element={<FullView />}></Route>
        <Route
          path="/editCategory/:categoryID"
          element={<EditCategory />}
        ></Route>
        <Route
          path="/deleteCategory/:categoryID"
          element={<DeleteCategory />}
        ></Route>
      </Routes>
    </div>
  );
}
export default App;
