import { Button, Select, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard';
import Head2 from '../components/Head2';

export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: '',
    sort: 'desc',
    category: 'uncategorized',
  });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Get the theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      setIsDarkMode(false);
    }

    // Apply dark or light mode to the body
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }

    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const sortFromUrl = urlParams.get('sort');
    const categoryFromUrl = urlParams.get('category');
    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        category: categoryFromUrl,
      });
    }

    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/backend/post/getposts?${searchQuery}`);
      if (!res.ok) {
        setLoading(false);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts);
        setLoading(false);
        if (data.posts.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    };
    fetchPosts();
  }, [location.search, isDarkMode]);

  const handleChange = (e) => {
    if (e.target.id === 'searchTerm') {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }
    if (e.target.id === 'sort') {
      const order = e.target.value || 'desc';
      setSidebarData({ ...sidebarData, sort: order });
    }
    if (e.target.id === 'category') {
      const category = e.target.value || 'uncategorized';
      setSidebarData({ ...sidebarData, category });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', sidebarData.searchTerm);
    urlParams.set('sort', sidebarData.sort);
    urlParams.set('category', sidebarData.category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/backend/post/getposts?${searchQuery}`);
    if (!res.ok) {
      return;
    }
    if (res.ok) {
      const data = await res.json();
      setPosts([...posts, ...data.posts]);
      if (data.posts.length === 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light');
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 transition-all">
      <Head2 />
      <div className="flex justify-between p-6">
        <div className="flex items-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Search</h2>
        </div>
        
      </div>
      <div className="flex flex-col md:flex-row p-6 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/4 dark:bg-gray-700">
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label className="text-lg font-semibold text-gray-900 dark:text-white">Search Term:</label>
              <TextInput
                placeholder="Search..."
                id="searchTerm"
                type="text"
                value={sidebarData.searchTerm}
                onChange={handleChange}
                className="dark:bg-gray-800 dark:text-white"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-lg font-semibold text-gray-900 dark:text-white">Sort:</label>
              <Select onChange={handleChange} value={sidebarData.sort} id="sort" className="dark:bg-gray-800 dark:text-white">
                <option value="desc">Latest</option>
                <option value="asc">Oldest</option>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-lg font-semibold text-gray-900 dark:text-white">Category:</label>
              <Select
                onChange={handleChange}
                value={sidebarData.category}
                id="category"
                className="dark:bg-gray-800 dark:text-white"
              >
                <option value="uncategorized">Uncategorized</option>
                <option value="Blog">Blog</option>
                <option value="Event">Event</option>
                
              </Select>
            </div>
            <Button type="submit" outline gradientDuoTone="purpleToPink" className="mt-4">
              Apply Filters
            </Button>
          </form>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-semibold border-b pb-4 mb-6 text-gray-900 dark:text-white">
            Post Results
          </h1>
          <div className="flex flex-wrap gap-6">
            {!loading && posts.length === 0 && (
              <p className="text-xl text-gray-500 dark:text-gray-300">No posts found.</p>
            )}
            {loading && <p className="text-xl text-gray-500 dark:text-gray-300">Loading...</p>}
            {!loading &&
              posts &&
              posts.map((post) => <PostCard key={post._id} post={post} />)}
            {showMore && (
              <button
                onClick={handleShowMore}
                className="text-teal-500 text-lg hover:underline p-4 mt-6 w-full dark:text-teal-400"
              >
                Show More
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
