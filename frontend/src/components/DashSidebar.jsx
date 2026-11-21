import { useState, useEffect } from 'react';
import { Sidebar } from 'flowbite-react';
import { useSelector, useDispatch } from 'react-redux';
import {
  HiChartPie,
  HiUser,
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineUserGroup,
  HiAnnotation,
  HiCalendar,
  HiMap,
  HiQuestionMarkCircle,
  HiChevronDown,
  HiChevronUp,
  HiCog,          // 🛠️ Admin icon
  HiStar          // 🌟 For You icon
} from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';
import { signOutSuccess } from '../redux/user/userSlice.js';

const DashSidebar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();
  const [tab, setTab] = useState('');
  const [adminOpen, setAdminOpen] = useState(false);
  const [forYouOpen, setForYouOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignOut = async () => {
    try {
      const res = await fetch(`/backend/user/signout`, {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">

          {currentUser && currentUser.isAdmin && (
            <Link to="/dashboard?tab=dash">
              <Sidebar.Item active={tab === 'dash'} icon={HiChartPie} as="div">
                Dashboard
              </Sidebar.Item>
            </Link>
          )}

          <Link to='/dashboard?tab=profile'>
            <Sidebar.Item
              active={tab === 'profile'}
              icon={HiUser}
              label={currentUser.isAdmin ? 'Admin' : 'User'}
              as="div"
            >
              Profile
            </Sidebar.Item>
          </Link>

          {/* Admin Section */}
          {currentUser.isAdmin && (
            <div>
              <Sidebar.Item
                icon={HiCog}
                className="cursor-pointer flex items-center justify-between"
                onClick={() => setAdminOpen(!adminOpen)}
                as="div"
              >
                <span className="flex items-center gap-2">
                  Admin
                </span>
                {adminOpen ? <HiChevronUp /> : <HiChevronDown />}
              </Sidebar.Item>

              {adminOpen && (
                <div className="ml-4 flex flex-col gap-1">
                  <Link to='/dashboard?tab=posts'>
                    <Sidebar.Item active={tab === 'posts'} icon={HiDocumentText} as="div">
                      Posts
                    </Sidebar.Item>
                  </Link>
                    <Link to='/dashboard?tab=Det'>
                    <Sidebar.Item active={tab === 'e-mail'} icon={HiDocumentText} as="div">
                      Envoyer E-Mail
                    </Sidebar.Item>
                  </Link>
                  <Link to='/dashboard?tab=users'>
                    <Sidebar.Item active={tab === 'users'} icon={HiOutlineUserGroup} as="div">
                      Users
                    </Sidebar.Item>
                  </Link>
                  <Link to='/dashboard?tab=Form'>
                    <Sidebar.Item active={tab === 'Form'} icon={HiAnnotation} as="div">
                      Form
                    </Sidebar.Item>
                  </Link>
                  <Link to='/dashboard?tab=comments'>
                    <Sidebar.Item active={tab === 'comments'} icon={HiAnnotation} as="div">
                      Comments
                    </Sidebar.Item>
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Public Items */}
          <Link to='/dashboard?tab=Events'>
            <Sidebar.Item active={tab === 'Events'} icon={HiCalendar} as="div">
              Coming Soon
            </Sidebar.Item>
          </Link>
          <Link to='/dashboard?tab=Chatroom'>
            <Sidebar.Item active={tab === 'Chatroom'} icon={HiCalendar} as="div">
              Chatroom
            </Sidebar.Item>
          </Link>
          <Link to='/dashboard?tab=calendar'>
            <Sidebar.Item active={tab === 'calendar'} icon={HiCalendar} as="div">
              Calendar
            </Sidebar.Item>
          </Link>
          <Link to='/dashboard?tab=Blog'>
            <Sidebar.Item active={tab === 'Blog'} icon={HiDocumentText} as="div">
              Blog
            </Sidebar.Item>
          </Link>
          <Link to='/dashboard?tab=NewsApp'>
            <Sidebar.Item active={tab === 'NewsApp'} icon={HiArrowSmRight} as="div">
              NewsApp
            </Sidebar.Item>
          </Link>

          {/* For You Section */}
          <div>
            <Sidebar.Item
              icon={HiStar}
              className="cursor-pointer flex items-center justify-between"
              onClick={() => setForYouOpen(!forYouOpen)}
              as="div"
            >
              <span className="flex items-center gap-2">
                For You
              </span>
              {forYouOpen ? <HiChevronUp /> : <HiChevronDown />}
            </Sidebar.Item>

            {forYouOpen && (
              <div className="ml-4 flex flex-col gap-1">
                <Link to='/dashboard?tab=Team'>
                  <Sidebar.Item active={tab === 'Team'} icon={HiOutlineUserGroup} as="div">
                    Team
                  </Sidebar.Item>
                </Link>
                <Link to='/dashboard?tab=Geography'>
                  <Sidebar.Item active={tab === 'Geography'} icon={HiMap} as="div">
                    Geography
                  </Sidebar.Item>
                </Link>
                <Link to='/dashboard?tab=FAQ'>
                  <Sidebar.Item active={tab === 'FAQ'} icon={HiQuestionMarkCircle} as="div">
                    FAQ
                  </Sidebar.Item>
                </Link>
                <Link to='/dashboard?tab=GameCards'>
                  <Sidebar.Item active={tab === 'GameCards'} icon={HiCalendar} as="div">
                    Games
                  </Sidebar.Item>
                </Link>
                <Link to='/dashboard?tab=DiscordPage'>
                  <Sidebar.Item active={tab === 'DiscordPage'} icon={HiOutlineUserGroup} as="div">
                    Discord Page
                  </Sidebar.Item>
                </Link>
              </div>
            )}
          </div>

          {/* Sign Out */}
          <Sidebar.Item
            icon={HiArrowSmRight}
            className="cursor-pointer"
            onClick={handleSignOut}
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashSidebar;
