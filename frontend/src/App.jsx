import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Events from "./pages/Events";
import Blog from "./pages/Blog";
import Det from "./pages/Det";
import FooterCom from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute";
import CreatePost from "./pages/CreatePost";
import Conference from "./pages/Conference";
import UpdatePost from "./pages/UpdatePost";
import PostPage from "./pages/PostPage";
import ScrollToTop from "./components/ScrollToTop";
import Search from "./pages/Search";
import NewsApp from "./pages/NewsApp";
import Contactez from "./pages/Contactez";

// New Home Pages
import Intro from "./pages/Intro";


const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        {/* Home Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/home/intro" element={<Intro />} />
    
        
        {/* Other Pages */}
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/Conference" element={<Conference />} />
        <Route path="/Events" element={<Events />} />
        <Route path="/Blog" element={<Blog />} />
        <Route path="/Det" element={<Det />} />
        <Route path="/search" element={<Search />} />
        <Route path="/NewsApp" element={<NewsApp />} />
        <Route path="/Contactez" element={<Contactez />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:postId" element={<UpdatePost />} />
        </Route>

        {/* Post Pages */}
        <Route path="/post/:postSlug" element={<PostPage />} />
      </Routes>
      <FooterCom />
    </BrowserRouter>
  );
};

export default App;

