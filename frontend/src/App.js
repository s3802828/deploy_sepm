import "bootstrap-icons/font/bootstrap-icons.css";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './Navbar';
import MainPage from './components/mainpage/MainPage';
import AddFunction from './components/forms/AddFunction';
import Footer from './Footer';
import DiscussionPage from './components/discussion_page/DiscussionPage';
import AddAdmin from './components/forms/AddAdmin';
import Homepage from './Homepage';
import PageNotFound from "./PageNotFound";
import ProfilePage from './components/profile_page/ProfilePage';
import PostDetailPage from "./components/discussion_page/PostDetailPage";
import PasswordChange from "./components/forms/ChangePass"
import Login from "./components/login_signup/Login";
import Signup from "./components/login_signup/Signup";
import EditPost from "./components/forms/EditPost";
import { useDispatch, useSelector } from 'react-redux';
import { getRole } from "./redux_sepm/actions/user";
import { useEffect } from "react";

function App() {
  const { authData, role } = useSelector((state) => state?.authReducer)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getRole())
  }, [])
  return (
    <div >
      <Router>
        <div>
          <Navbar />
        </div>
        <div>
          <Routes>
            <Route exact path="/" element={<Homepage />} />
            <Route exact path="/cheatsheet/:language_id" element={<MainPage />} />
            {authData && role && role.includes('admin') && <Route exact path="/addfunction/:language_id" element={<AddFunction />} />}
            <Route exact path="/discussion/:language_id/:topic_id" element={<DiscussionPage />} />
            {authData && role && role.includes('admin') && <Route exact path="/addadmin" element={<AddAdmin />} />}
            <Route exact path="/profile/:user_id" element={<ProfilePage />} />
            <Route exact path="/postdetail/:post_id" element={<PostDetailPage />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/passwordchange" element={<PasswordChange />} />
            <Route exact path="/editpost/:post_id" element={<EditPost />} />
            <Route exact path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
