    import Nav from "./components/Nav";
import "./App.css";

import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Main from "./components/Main";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import ProtectedRoutes from "./components/ProtectedRoutes";

const App = () => {
  return (
    <div className="container py-3">
      <Nav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile/:username" element={<Profile />} />
        {/* ProtectedRoutes */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/profile/edit" element={<EditProfile />} />
        </Route>
        {/* ProtectedRoutes */}
      </Routes>
      <Footer />
    </div>
  );
};
export default App;
