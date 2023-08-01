// module
import 'swiper/css'
import 'swiper/css/pagination'
import ISO6391 from 'iso-639-1'
import { SwiperSlide } from 'swiper/react'
import { useNavigate } from 'react-router-dom'
// icons & types & component
import { AiFillStar } from 'react-icons/ai'
import { BsFillPlayFill } from 'react-icons/bs'
import { MoviesTypes } from '../../types/Movies.types'
import BackdropContainer from '../UI/BackdropContainer'

type PropsTypes = {
    data: MoviesTypes
}
const BackdropImageMovies = ({data}: PropsTypes) => {
    const navigate = useNavigate()
    if(data) {
        return (
            <section className="flex">
                <BackdropContainer>
                    {data.map(movie => (
                        <SwiperSlide key={movie.id} className="flex flex-col-reverse lg:flex-row relative min-h-[430px] md:min-h-[460px]">
                            <div className="flex-[0.5] lg:flex-[0.4] bg-black lg:rounded-s-xl border-transparent h-full py-10 px-5 lg:p-10 flex flex-col justify-center">
                                <div className="flexx mb-3 space-x-2">
                                    <div className="flexx bg-yellow-500 text-[#000] font-bold w-max rounded-lg px-2 py-1 text-sm">
                                        <AiFillStar className="mr-1"/>
                                        <p>{movie.vote_average}</p>
                                    </div>
                                    <div className="bg-primary-color text-white w-max rounded-lg px-2 py-1 text-sm">
                                        <p>{movie.genre_ids?.includes(10749) || movie.genre_ids?.includes(99) || movie.genre_ids?.includes(18) || movie.adult ? "18+" : "13+"}</p>
                                    </div>
                                </div>
                                <h1 className="text-2xl lg:text-4xl leading-[1.7] text-white font-bold mb-3 line-clamp-4 break-words">
                                    {movie.title}
                                </h1>
                                <p className="line-clamp-3 lg:line-clamp-6 text-sm text-gray-500 leading-[1.8] mb-3">
                                    {movie.overview ? movie.overview : "Unknown"}
                                </p>
                                <div className="flexx w-max space-x-4">
                                    <p className="font-medium text-white">{movie.release_date ? new Date(movie.release_date).getFullYear() : "Unknown"}</p>
                                    <span className="text-white">|</span>
                                    <p className="font-medium text-white">{movie.original_language ? ISO6391.getName(movie.original_language) : "Unknown"}</p>
                                </div>
                                <div className="flexx space-x-4 mt-6">
                                    <button className="w-full md:w-max lg:w-full flex_center bg-primary-transparent px-5 py-2 rounded-full text-white text-lg hover:scale-[0.95] transition duration-300 ease-in-out" onClick={() => navigate(`/movies/${movie.id}`)}>
                                        <BsFillPlayFill className="mr-2 text-xl"/>
                                        Watch Now
                                    </button>
                                </div>
                            </div>
                            <div className={`relative flex-[0.5] lg:flex-[0.6] lg:h-full ${movie.backdrop_path === null ? "bg-black" : ""}`}>
                                <div className="absolute w-full h-full bg-gradient-to-t lg:bg-gradient-to-r from-black to-[rgba(0,0,0,0.1)] -mb-[15px] lg:mb-0 lg:-ml-[1px] lg:rounded-e-xl"/>
                                {movie.backdrop_path !== null ? <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt="backdrop_image" className="w-full h-full bg-contain lg:rounded-e-xl"/> : null}
                            </div>
                        </SwiperSlide>
                    ))}
                </BackdropContainer>
            </section>
        )
    } else return null
}

export default BackdropImageMovies