import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";

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
import DiscordPage from './components/DiscordPage';

import GameCards from "./components/GameCards";
import Game1 from "./components/Games/Game1";
import Game2 from "./components/Games/Game2";
import Game3 from "./components/Games/Game3";
import Game4 from "./components/Games/Game4";
import Game5 from "./components/Games/Game5";
import Game6 from "./components/Games/Game6";

import Search from "./pages/Search";
import NewsApp from "./pages/NewsApp";
import Contactez from "./pages/Contactez";
import Service from "./pages/Service";
import PaymentPage from "./pages/PaymentPage";
import Intro from "./pages/Intro";
import Chatroom from "./pages/Chatroom";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFail from "./pages/PaymentFail";

// ✅ Toast
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      
      <Routes>
        {/* Home Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/home/intro" element={<Intro />} />

        {/* Payment */}
        <Route path="/PaymentPage" element={<PaymentPage />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-fail" element={<PaymentFail />} />

        {/* Public Pages */}
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/Conference" element={<Conference />} />
        <Route path="/Chatroom" element={<Chatroom />} />
        <Route path="/Blog" element={<Blog />} />
        <Route path="/Det" element={<Det />} />
        <Route path="/search" element={<Search />} />
        <Route path="/Service" element={<Service />} />
        <Route path="/NewsApp" element={<NewsApp />} />
        <Route path="/Contactez" element={<Contactez />} />
        <Route path="/DiscordPage" element={<DiscordPage />} />

        {/* Jeux */}
        <Route path="/GameCards" element={<GameCards />} />
        <Route path="/TicTacToe" element={<Game1 />} />
        <Route path="/GuessTheNumber" element={<Game2 />} />
        <Route path="/MemoryGame" element={<Game3 />} />
        <Route path="/RockPaperScissors" element={<Game4 />} />
        <Route path="/ClickSpeedTest" element={<Game5 />} />
        <Route path="/MiniQuiz" element={<Game6 />} />

        {/* Utilisateurs Authentifiés */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* Admin */}
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:postId" element={<UpdatePost />} />
        </Route>

        {/* Post unique */}
        <Route path="/post/:postSlug" element={<PostPage />} />
      </Routes>

      <FooterCom />
      
      {/* ✅ Affichage des notifications */}
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
