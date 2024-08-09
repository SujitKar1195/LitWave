import {Link} from 'react-router-dom';

const BookCard = ({data}) => {
  return (
    <>
      <Link>
        <div className='bg-zinc-800 rounded-md p-4 flex flex-col'>
          <div className='bg-zinc-900 rounded-md flex items-center justify-center'>
            <img
              className='h-[25vh]'
              src={data.url}
              alt=''
            />
          </div>
          <h2 className='mt-4 text-xl text-zinc-100'>{data.title}</h2>
          <p className='mt-2 text-zinc-100 font-thin'>by {data.author}</p>
          <p className='mt-2 text-zinc-100 text-sm'>₹ {data.price}</p>
        </div>
      </Link>
    </>
  );
};

export default BookCard;
