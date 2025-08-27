import { User } from 'lucide-react'

const ReviewCard = ({ review }) => {

  const { comment, createdAt, rating, userId } = review;

  return (
    <div className='h-full w-full bg-white rounded-lg shadow-md p-6 flex flex-col'>
      <div className='flex items-center gap-3'>
        <div className='w-[40px] aspect-square bg-rose-200 rounded-full border border-rose-300 
      shadow-sm flex items-center justify-center uppercase text-gray-700 font-semibold'>{userId.firstName[0] + userId.secondName[0]}</div>
        <div className='text-gray-800 text-lg font-semibold'>{userId.firstName + " " + userId.secondName}</div>
      </div>
      <div className='flex items-center gap-2 mt-2'>
        <span className='text-yellow-500 text-xl'>{'★ '.repeat(rating)}</span>
        <span className='text-gray-500'>({rating})</span>
      </div>
      <div className='mt-2 text-gray-600'>"{comment}"</div>
      <div className='mt-2 text-gray-500'>{new Date(createdAt).toLocaleDateString()}</div>
    </div>
  )
}

export default ReviewCard