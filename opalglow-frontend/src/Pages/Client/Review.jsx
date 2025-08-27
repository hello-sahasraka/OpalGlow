import { BadgePlus, SquareX } from 'lucide-react'
import Footer from '../../Components/Footer'
import Loader from '../../Components/Loader'
import ReviewCard from '../../Components/ReviewCard'
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';


const Review = () => {
    const stars = [1, 2, 3, 4, 5];

    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [displayAddReview, setDisplayAddReview] = useState(false);

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState("None");


    useEffect(() => {
        axios
            .get(import.meta.env.VITE_BACKEND_URL + "/api/review/getreviews")
            .then((response) => {
                setReviews(response.data);
                console.log(response.data);
                setLoading(false);
            })
            .catch((e) => {
                console.log(e);
                setLoading(false);
            });
    }, [loading]);

    const handleSubmitReview = () => {
        const token = localStorage.getItem('token');

        if (!token) {
            toast.error("You must be logged in to submit a review");
            setLoading(false);
            return;
        }

        const reviewData = {
            rating,
            comment
        };

        toast.promise(
            saveReview(reviewData, token),
            {
                loading: 'Saving...',
                success: <b>Review saved!</b>,
                error: <b>Could not save.</b>,
            }
        );

        setDisplayAddReview(false);
        setLoading(true);
    }

    const saveReview = async (reviewData, token) => {
        const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/review`, reviewData,
            {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            }
        );

        return response.data;
    };

    return (
        <div>
            {loading ? (<div className='h-screen w-full'><Loader /></div>) : (

                <div className='w-full h-full bg-rose-50'>
                    <div className="w-full h-full px-4 md:px-10 lg:px-[100px]">
                        <div className="text-2xl sm:text-3xl font-bold text-gray-900 py-8 sm:py-12">
                            What Our <span className="text-rose-500">Community</span> Say!
                        </div>
                        <div title='Add a Review' className="p-2 aspect-square rounded-full bg-rose-500 text-white 
                inline-flex hover:scale-110 transition-all duration-200 mb-6 cursor-pointer fixed right-10 bottom-8 shadow"
                            onClick={() => setDisplayAddReview(!displayAddReview)}>
                            <BadgePlus size={40} />
                        </div>
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                            {reviews.map((review) => (
                                <ReviewCard key={review._id} review={review} />
                            ))}
                        </div>
                    </div>
                    <div className='flex flex-col justify-baseline'>
                        <Footer />
                    </div>
                    {displayAddReview &&
                        <div className='fixed inset-0 z-100 h-full w-full aspect-square bg-gray-800/50
                        flex justify-center items-center'>

                            <div className='w-[450px] bg-gray-100 rounded-xl shadow-lg p-8 outline-2 outline-gray-500/30 outline-offset-[-8px]'>
                                <div className='w-full flex justify-end'><span className='text-gray-400 hover:text-rose-600 hover:scale-110 
                                transition-all duration-100'
                                    onClick={() => setDisplayAddReview(false)}><SquareX size={25} /></span></div>
                                <h1 className='text-center text-gray-700/90 text-2xl font-semibold mt-2 py-2 border-b-1 
                                border-gray-300'>Tell us how you liked your <span className='text-rose-500'>OpalGlow's</span> experience</h1>
                                <div className='mt-8' >
                                    <div className="w-full flex flex-col items-center justify-center space-x-1 my-4">
                                        <h2 className='text-gray-700 font-semibold'>Rate and review</h2>
                                        <div>
                                            {stars.map((star) => (
                                                <span
                                                    key={star}
                                                    className={`cursor-pointer text-4xl transition duration-200 
                                                ${(hover || rating) >= star ? "text-yellow-400" : "text-gray-400"}`}
                                                    onClick={() => setRating(star)}
                                                    onMouseEnter={() => setHover(star)}
                                                    onMouseLeave={() => setHover(0)}
                                                >
                                                    ★
                                                </span>
                                            ))}
                                        </div>

                                    </div>
                                    <textarea className='w-full h-32 p-2 border border-gray-400 rounded-lg placeholder:text-sm placeholder:text-gray-400'
                                        placeholder='Write your review here...'
                                        onChange={(e) => { setComment(e.target.value) }}></textarea>

                                    <button className='mt-4 w-full bg-rose-500 text-white font-md py-2 rounded-lg hover:bg-rose-600 transition duration-200'
                                        onClick={handleSubmitReview}>Submit Review</button>
                                </div>
                            </div>

                        </div>
                    }
                </div>
            )}

        </div>
    )
}

export default Review