import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashPosts from '../components/DashPosts';
import DashUsers from '../components/DashUsers';
import DashCalendar from '../components/Calendar';
import FAQ from '../components/FAQ';
import Team from '../components/Team';
import Events from '../pages/Events';
import Blog from '../pages/Blog';
import Det from '../pages/Det';
import Chatroom from '../pages/Chatroom';
import DasboardStripe from '../pages/DasboardStripe';
import NewsApp from '../pages/NewsApp';
import Geography from '../components/geography/Geography';
import DashComments from '../components/DashComments';
import DashboardComp from '../components/DashboardComp';

import DiscordPage from '../components/DiscordPage';
import GameCards from '../components/GameCards';
import Form from '../components/Form';
const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        <DashSidebar />
      </div>
      <div className="flex-1 p-4">
      

        {/* Tabs */}
        {tab === 'profile' && <DashProfile />}
        {tab === 'posts' && <DashPosts />}
        {tab === 'users' && <DashUsers />}
        {tab === 'calendar' && <DashCalendar />}
        {tab === 'comments' && <DashComments />}
        {tab === 'FAQ' && <FAQ />}
        {tab === 'Team' && <Team />}
        {tab === 'Geography' && <Geography/>}
        {tab === 'Events' && <Events/>}
        {tab === 'Form' && <Form/>}
        {tab === 'Blog' && <Blog/>}
        {tab === 'NewsApp' && <NewsApp/>}
        {tab === 'GameCards' && <GameCards/>}
        {tab === 'DiscordPage' && <DiscordPage/>}
        {tab === 'Chatroom' && <Chatroom/>}
        {tab === 'Det' && <Det/>}
        {tab === 'dash' && (
          <div>
            <DashboardComp />
            <DasboardStripe />
            


            
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

