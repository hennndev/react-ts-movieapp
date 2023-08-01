// utils
import ISO6391 from 'iso-639-1'
import { MovieDetailUnionTypes } from '../../types/MovieDetail.types'
// components & icons
import { AiFillStar } from 'react-icons/ai'
import { BsFillPlayFill } from 'react-icons/bs'
import imgnotfound from '../../assets/imgnotfound.jpg'
import 'react-lazy-load-image-component/src/effects/blur.css'
import { BiChevronsUp, BiChevronsDown } from 'react-icons/bi'

type PropsTypes = {
    data: MovieDetailUnionTypes,
    handleShowVideo: () => void
}

const Detail = ({data, handleShowVideo}: PropsTypes) => {

    const isProfit = (data.revenue - data.budget) > 0  
    const isAdult = [] || [10749, 99, 18].some((num) => data.genres.map(genre => genre.id).includes(num))
    

    return (
        <div className={`relative ${data.backdrop_path ? "-mt-[55%]" : ""} w-full h-full flex flex-col md:flex-row p-10 md:p-16`}>
            <img src={data.poster_path ? `${import.meta.env.VITE_IMAGE_URL}${data.poster_path}` : imgnotfound} alt={`poster-image-${data.title}`} className="object-contain w-[350px] h-[400px] rounded-lg mr-5 mb-5 md:mb-0 self-center md:self-start"/>
            <div>
                <div className="flex_center md:justify-normal md:flexx mb-3 space-x-2">
                    <div className="flexx bg-yellow-500 text-[#000] font-bold w-max rounded-lg px-2 py-1 text-sm">
                        <AiFillStar className="mr-1"/>
                        <p>{data.vote_average}</p>
                    </div>
                    <div className="bg-primary-color text-white w-max rounded-lg px-2 py-1 text-sm">
                        <p>{!isAdult ? "13+" : "18+"}</p>
                    </div>
                    <div className="bg-gray-500 text-white w-max rounded-lg px-2 py-1 text-sm">
                        <p className="font-medium text-white">
                            {data.release_date ? new Date(data.release_date).getFullYear() : "Unknown"}
                        </p>
                    </div>
                    <div className="bg-blue-500 text-white w-max rounded-lg px-2 py-1 text-sm">
                        <p className="font-medium text-white">{ISO6391.getName(data.original_language)}</p>
                    </div>
                </div>


                <h1 className="text-center md:text-left text-2xl lg:text-4xl leading-[1.3] text-white font-bold mb-3">{data.title}</h1>
                <div className="mb-2">
                    <h2 className="font-semibold mb-1 text-lg text-white">Overview: </h2>
                    <p className="lg:line-clamp-6 text-white leading-[1.8]">{data.overview ? data.overview : "Unknown"}</p>
                </div>
                
                <div className="mb-2">
                    <h2 className="font-semibold text-lg text-white">
                        Genres: {" "} 
                        {data.genres.length > 0 ? data.genres.map(({name}: Record<string, string | number>, idx: number) => (
                            <span className="mr-2 font-normal text-base" key={name}>{name}{data.genres.length - 1 === idx ? "" : ","}</span>
                        )) : (
                            <span className="font-normal text-base">Unknown</span>
                        )} 
                    </h2>
                </div>

                <div className="mb-2">
                    <h2 className="font-semibold text-lg text-white">
                        Release Date: {" "} <span className="font-normal text-base">{data.release_date ? new Date(data.release_date).getFullYear() : "Unknown"}</span> 
                    </h2>
                </div>

                <div className="mb-2">
                    <h2 className="font-semibold text-lg text-white">Status: {" "} <span className="font-normal text-base">{data.status}</span></h2>
                </div>

                <div className="mb-2">
                    <h2 className="font-semibold text-lg text-white">
                        Budget: {" "}
                        <span className="font-normal text-base">
                            {data.budget.toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD"
                            })}
                        </span>
                    </h2>
                </div> 

                <div className="mb-2">
                    <h2 className="font-semibold text-lg text-white">
                        Revenue: {" "}
                        <span className="font-normal text-base">
                            {data.revenue.toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD"
                            })}
                        </span> 
                        {!data.budget || !data.revenue ? null : (
                            <span className="font-normal text-base flexx space-x-1">
                                &#40;
                                {isProfit ? <BiChevronsUp className="text-green-500"/> : <BiChevronsDown className="text-red-500"/>}
                                <span className={`${isProfit ? "text-green-500" : "text-red-500"}`}>{(data.revenue - data.budget).toLocaleString("en-US", {
                                    style: "currency",
                                    currency: "USD"
                                })}</span>
                                &#41;
                            </span>
                        )}
                    </h2>                                
                </div>
                
                <div className="mb-2">
                    <h2 className="font-semibold text-lg text-white">
                        Spoken Languages: {" "}
                        {data.spoken_languages.map(({iso_639_1, english_name}: Record<string, string>, idx: number) => (
                            <span className="mr-2 font-normal text-base" key={iso_639_1}>
                                {english_name}{data.spoken_languages.length - 1 === idx ? "" : ","}
                            </span>
                        ))}
                    </h2>
                </div>
                <button className="w-max lg:w-[70%] flex_center bg-primary-transparent px-5 py-2 rounded-full text-white text-lg hover:scale-[0.95] transition duration-300 ease-in-out mt-4" onClick={handleShowVideo}>
                    <BsFillPlayFill className="mr-2 text-xl"/>
                    Watch Trailer
                </button>
            </div>
        </div> 
    )
}

export default Detail