import { Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import CommentSection from '../components/CommentSection';
import PostCard from '../components/PostCard';
import Head2 from '../components/Head2';
import { FaStar } from 'react-icons/fa';

export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/backend/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
        } else {
          setPost(data.posts[0]);
          setError(false);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const res = await fetch(`/backend/post/getposts?limit=3`);
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchRecentPosts();
  }, []);

  useEffect(() => {
    const storedRating = localStorage.getItem(`post-rating-${postSlug}`);
    if (storedRating) {
      setRating(parseInt(storedRating));
    }
  }, [postSlug]);

  const handleRating = (value) => {
    setRating(value);
    localStorage.setItem(`post-rating-${postSlug}`, value);
  };

  if (loading) {
    return (
      <div>
        <Head2 />
        <div className="flex justify-center items-center min-h-screen">
          <Spinner size="xl" />
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div>
        <Head2 />
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-red-600">Unable to load post.</p>
        </div>
      </div>
    );
  }

  const handleJoin = async () => {
    try {
      const res = await fetch(`/backend/post/join/${post._id}`, {
        method: 'POST',
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || 'Failed to join event');
      } else {
        alert('Successfully joined the event!');
        setPost(data);
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong');
    }
  };

  return (
    <main className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Head2 />
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{post.title}</h1>
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-300 mb-4">
              <Link to={`/search?category=${post.category}`}>
                <Button color="gray" pill size="xs">
                  {post.category}
                </Button>
              </Link>
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>

            <img
              src={post.image}
              alt={post.title}
              className="w-full h-80 object-cover rounded-xl mb-6 shadow-md"
            />

            {post.category === 'Event' && (
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-xl mb-6">
                <p className="font-medium text-gray-800 dark:text-white mb-1">
                  Spots: {post.attendees.length} / {post.maxMembers}
                </p>
                {post.eventDeadline && (
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    Deadline: {new Date(post.eventDeadline).toLocaleDateString()}
                  </p>
                )}
                <button
                  onClick={handleJoin}
                  disabled={post.attendees.length >= post.maxMembers}
                  className={`text-white px-4 py-2 rounded-md transition ${
                    post.attendees.length >= post.maxMembers
                      ? 'bg-red-300 cursor-not-allowed'
                      : 'bg-red-500 hover:bg-red-600'
                  }`}
                >
                  {post.attendees.length >= post.maxMembers ? 'Event Full' : 'Join Event'}
                </button>
              </div>
            )}

            <div
              className="prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            ></div>

            {/* ⭐ Star Rating */}
            <div className="mt-6">
              <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rate this post:</h2>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => {
                  const starValue = i + 1;
                  return (
                    <label key={starValue}>
                      <input
                        type="radio"
                        name="rating"
                        value={starValue}
                        className="hidden"
                        onClick={() => handleRating(starValue)}
                      />
                      <FaStar
                        className={`cursor-pointer text-2xl transition ${
                          starValue <= (hover || rating) ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                        onMouseEnter={() => setHover(starValue)}
                        onMouseLeave={() => setHover(null)}
                      />
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="text-xs text-gray-500 mt-6 border-t pt-3 flex justify-between">
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              <span className="italic">{(post.content.length / 1000).toFixed(0)} mins read</span>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <CommentSection postId={post._id} />
        </div>

        <div className="mt-12">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 text-center">Recent Articles</h2>
          <div className="flex flex-wrap justify-center gap-5">
            {recentPosts &&
              recentPosts.map((p) => <PostCard key={p._id} post={p} />)}
          </div>
        </div>
      </div>
    </main>
  );
}
