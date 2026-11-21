import { Link } from 'react-router-dom';

export default function EventCard({ event }) {
  return (
    <div className='group relative w-full border border-gray-300 hover:border-red-500 h-[400px] overflow-hidden rounded-lg sm:w-[430px] transition-all shadow-lg hover:shadow-xl'>
      <Link to={`/event/${event.slug}`}>
        <img
          src={event.image}
          alt='event cover'
          className='h-[260px] w-full object-cover group-hover:scale-105 transition-all duration-300 z-20'
        />
      </Link>
      <div className='p-4 flex flex-col gap-3'>
        <p className='text-xl font-semibold text-gray-800 group-hover:text-red-500 transition-all duration-300 line-clamp-2'>{event.title}</p>
        <span className='italic text-sm text-gray-500'>{event.category}</span>
        <Link
          to={`/event/${event.slug}`}
          className='z-10 absolute bottom-[-60px] left-0 right-0 mx-4 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md transform group-hover:bottom-4'
        >
          Read article
        </Link>
        
      </div>
    </div>
  );
}
