// modules
import { useNavigate } from 'react-router-dom';
import 'react-lazy-load-image-component/src/effects/blur.css'
// utils & types
import { useData } from '../../context/context';
import { MovieTypes } from '../../types/Movies.types'
// components & icons
import imgnotfound from '../../assets/imgnotfound.jpg'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { AiOutlinePlus, AiFillStar, AiFillDelete } from 'react-icons/ai'

type PropsTypes = {
    data: MovieTypes,
    isBookmark?: boolean
}

const Movie = ({data, isBookmark}: PropsTypes) => {
    const navigate = useNavigate()
    const { handleAddMovieToBM, handleDeleteMovieFromBM } = useData()

    const handleClick = (data: MovieTypes) => {
        if(isBookmark) {
            handleDeleteMovieFromBM(data.id)
        } else {
            handleAddMovieToBM(data)
        }
    }

    return (
        data && (
            <article className="h-[250px] md:h-[350px] lg:h-[300px] relative">
                <div className="absolute bg-gradient-to-t from-[rgba(0,0,0,0.9)] to-[rgba(0,0,0,0.2)] w-full h-full p-3 flex justify-between flex-col flex-1 z-10 rounded-b-lg">
                    <div className="flexx bg-yellow-500 text-[#000] font-bold w-max rounded-lg px-1.5 py-1 text-xs">
                        <AiFillStar className="mr-2"/>
                        <p>{data.vote_average}</p>
                    </div>
                    <div>
                        <h1 className="text-gray-300 text-sm sm:text-md lg:text-lg font-bold mb-2 line-clamp-5 break-words">{data.title}</h1>
                        <p className="text-gray-300 text-xs lg:text-sm font-semibold mb-2">
                            {data.release_date ? new Date(data.release_date).getFullYear() : "Unknown"}
                        </p>
                        <div className="flex_between">
                            <button className="bg-primary-transparent px-3 py-1.5 rounded-full text-white text-xs lg:text-sm mr-3 hover:scale-[0.95] transition duration-300 ease-in-out" onClick={() => navigate(`/movies/${data.id}`)}>Watch Now</button>
                            <button className="w-6 h-6 lg:w-8 lg:h-8 flex_center bg-[rgba(255,255,255,0.2)] rounded-full cursor-pointer hover:scale-[0.90] transition duration-300" onClick={() => handleClick(data)}>
                                {isBookmark ? <AiFillDelete className="text-white"/> : <AiOutlinePlus className="text-white"/>}
                            </button>
                        </div>
                    </div>
                </div>
                <LazyLoadImage 
                    src={`${data.poster_path !== null ? `${import.meta.env.VITE_IMAGE_URL}/${data.poster_path}` : imgnotfound}`}
                    alt={data.title}
                    effect="blur"
                    width="100%"
                    height="100%"
                    className="w-full h-full rounded-lg bg-contain"
                />
            </article>
        )
    )
}

export default Movie