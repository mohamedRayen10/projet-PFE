import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from 'react-icons/hi';
import { Button, Table } from 'flowbite-react';
import { Link } from 'react-router-dom';

export default function DashboardComp() {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/backend/user/getusers?limit=5');
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchPosts = async () => {
      try {
        const res = await fetch('/backend/post/getposts?limit=5');
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthPosts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await fetch('/backend/comment/getComments?limit=5');
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          setTotalComments(data.totalComments);
          setLastMonthComments(data.lastMonthComments);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser.isAdmin) {
      fetchUsers();
      fetchPosts();
      fetchComments();
    }
  }, [currentUser]);

  return (
    <div className='p-3 md:mx-auto'>
      <div className='flex-wrap flex gap-4 justify-center'>
        <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
          <div className='flex justify-between'>
            <div>
              <h3 className='text-gray-500 text-md uppercase'>Total Users</h3>
              <p className='text-2xl'>{totalUsers}</p>
            </div>
            <HiOutlineUserGroup className='bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg' />
          </div>
          <div className='flex gap-2 text-sm'>
            <span className='text-green-500 flex items-center'>
              <HiArrowNarrowUp />
              {lastMonthUsers}
            </span>
            <div className='text-gray-500'>Last month</div>
          </div>
        </div>
        <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
          <div className='flex justify-between'>
            <div>
              <h3 className='text-gray-500 text-md uppercase'>Total Comments</h3>
              <p className='text-2xl'>{totalComments}</p>
            </div>
            <HiAnnotation className='bg-indigo-600 text-white rounded-full text-5xl p-3 shadow-lg' />
          </div>
          <div className='flex gap-2 text-sm'>
            <span className='text-green-500 flex items-center'>
              <HiArrowNarrowUp />
              {lastMonthComments}
            </span>
            <div className='text-gray-500'>Last month</div>
          </div>
        </div>
        <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
          <div className='flex justify-between'>
            <div>
              <h3 className='text-gray-500 text-md uppercase'>Total Posts</h3>
              <p className='text-2xl'>{totalPosts}</p>
            </div>
            <HiDocumentText className='bg-lime-600 text-white rounded-full text-5xl p-3 shadow-lg' />
          </div>
          <div className='flex gap-2 text-sm'>
            <span className='text-green-500 flex items-center'>
              <HiArrowNarrowUp />
              {lastMonthPosts.length}
            </span>
            <div className='text-gray-500'>Last month</div>
          </div>
        </div>
      </div>
      <div className='flex flex-wrap gap-4 py-3 mx-auto justify-center'>
        {/* Recent Users Table */}
        <div className='flex flex-col w-full md:w-[300px] shadow-md p-4 rounded-md '>
          <div className='flex justify-between items-center mb-4 text-2xl font-semibold text-red-700'>
            <h1> users</h1>
            <Button className='bg-red-300'>
              <Link to={'/dashboard?tab=users'}>Voir tout</Link>
            </Button>
          </div>
          <Table hoverable className="border border-red-700 rounded-lg overflow-hidden text-lg">
            <Table.Head className=" text-red-700 text-lg">
              <Table.HeadCell className="py-4 px-6">User image</Table.HeadCell>
              <Table.HeadCell className="py-4 px-6">Username</Table.HeadCell>
            </Table.Head>
            {users.slice(0, 3).map((user) => (
              <Table.Body key={user._id} className='divide-y'>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-100 transition'>
                  <Table.Cell className="py-4 px-6">
                    <img
                      src={user.profilePicture}
                      alt='user'
                      className='w-12 h-12 rounded-full bg-gray-500 border-2 border-gray-300'
                    />
                  </Table.Cell>
                  <Table.Cell className="py-4 px-6">{user.username}</Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
        </div>

        {/* Recent Comments Table */}
        <div className='flex flex-col w-full md:w-[300px] shadow-md p-4 rounded-md '>
          <div className='flex justify-between items-center mb-4 text-2xl font-semibold text-red-700'>
            <h1>commentaires</h1>
            <Button className='bg-red-300'>
              <Link to={'/dashboard?tab=comments'}>Voir tout</Link>
            </Button>
          </div>
          <Table hoverable className="border border-gray-700 rounded-lg overflow-hidden text-lg">
            <Table.Head className=" text-red-700 text-lg">
              <Table.HeadCell className="py-4 px-6">commentaire</Table.HeadCell>
              <Table.HeadCell className="py-4 px-6">React</Table.HeadCell>
            </Table.Head>
            {comments.slice(0, 3).map((comment) => (
              <Table.Body key={comment._id} className='divide-y'>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-100 transition'>
                  <Table.Cell className="py-4 px-6 w-96">
                    <p className='line-clamp-2'>{comment.content}</p>
                  </Table.Cell>
                  <Table.Cell className="py-4 px-6">{comment.numberOfLikes}</Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
        </div>

        
        <div className='flex flex-col w-full md:w-[300px] shadow-md p-4 rounded-md'>
          <div className='flex justify-between items-center mb-4 text-2xl font-semibold text-red-700'>
            <h1> posts</h1>
            <Button className='bg-red-300'>
              <Link to={'/dashboard?tab=posts'}>Voir tout</Link>
            </Button>
          </div>
          <Table hoverable className="border border-gray-700 rounded-lg overflow-hidden text-lg">
            <Table.Head className=" text-red-700 text-lg">
              <Table.HeadCell className="py-4 px-6">image</Table.HeadCell>
              <Table.HeadCell className="py-4 px-6">Titre</Table.HeadCell>
              
            </Table.Head>
            {posts.slice(0, 3).map((post) => (
              <Table.Body key={post._id} className='divide-y'>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-100 transition'>
                  <Table.Cell className="py-4 px-6">
                    <img
                      src={post.image}
                      alt='user'
                      className='w-16 h-12 rounded-md bg-gray-500 border border-gray-300'
                    />
                  </Table.Cell>
                  <Table.Cell className="py-4 px-6 w-96">{post.title}</Table.Cell>
                  
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
        </div>
      </div>
    </div>
  );
}
