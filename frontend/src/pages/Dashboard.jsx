import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashPosts from '../components/DashPosts';
import DashUsers from '../components/DashUsers';
import DashComments from '../components/DashComments';
import DashboardComp from '../components/DashboardComp';
import Head2 from '../components/Head2';
import DashboardCharts from '../components/DashboardCharts';

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
        <Head2 />

        {/* Tabs */}
        {tab === 'profile' && <DashProfile />}
        {tab === 'posts' && <DashPosts />}
        {tab === 'users' && <DashUsers />}
        {tab === 'comments' && <DashComments />}
        {tab === 'dash' && (
          <div>
            <DashboardComp />
            <div className="relative min-h-screen overflow-hidden">
  {/* Background Video */}
  <div className="relative min-h-screen overflow-hidden">
  {/* 🎥 Ultra-Clear Video Background */}
  <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute top-0 left-0 w-full h-full object-cover z-0"
    style={{
      filter: "none",         // ✅ no blur
      opacity: 1,             // ✅ full clarity
      transform: "none",      // ✅ no distortion
    }}
  >
    <source src="/videos/1st.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>

  {/* Foreground Content */}
  <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">
    <div className="p-6 rounded-xl shadow-xl bg-transparent">
      <DashboardCharts />
    </div>
  </div>
</div>





</div>

            
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

