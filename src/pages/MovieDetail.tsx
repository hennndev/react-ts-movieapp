// modules
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
// utils & types
import { baseURL } from '../config/instance'
import { MovieDetailUnionTypes } from '../types/MovieDetail.types'
// components & icons
import Modal from '../components/UI/Modal'
import Loader from '../components/UI/Loader'
import Detail from '../components/MovieDetail/Detail'
import ErrorMessage from '../components/UI/ErrorMessage'
import Collection from '../components/MovieDetail/Collection'
import VideoPlayer from '../components/MovieDetail/VideoPlayer'
import PageContainer from '../components/UI/Layout/PageContainer'


const MovieDetail = () => {
    const params = useParams()
    const [showVideo, setShowVideo] = useState<boolean>(false)
    const { data, isLoading: movieLoading, isSuccess, isError } = useQuery(
        ["movie_detail", params.movieId],
        async (): Promise<MovieDetailUnionTypes> => {
            const response = await baseURL({
                url: `movie/${params.movieId}?api_key=${import.meta.env.VITE_API_KEY}`,
                method: "GET"
            })
            return response.data
        }
    )
    const isDataCollection = Boolean(data?.belongs_to_collection?.id) //will convert to boolean
    const { data: imagesCollection } = useQuery(
        ["movies_collection_images", data?.belongs_to_collection?.id],
        async (): Promise<string[]> => {
            const response = await baseURL({
                url: `collection/${data?.belongs_to_collection?.id}/images?api_key=${import.meta.env.VITE_API_KEY}`,
                method: "GET"
            })
            return response.data.posters.map((poster: {file_path: string}) => poster.file_path)
        },
        {
            enabled: isDataCollection
        }
    )

    const { data: movieVideo } = useQuery(
        ["movies_videos", data?.id],
        async (): Promise<string | null> => {
            const response = await baseURL({
                url: `movie/${data?.id}/videos?api_key=${import.meta.env.VITE_API_KEY}`,
                method: "GET"
            })
            // console.log(response)
            return response.data.results[0]?.key || null
        },
        {
            enabled: Boolean(data?.id)
        }
    )

    const handleShowVideo = (value: boolean) => {
        if(movieVideo) {
            setShowVideo(value)
        } else {
            toast.error("Oops, trailer not exist")
        }
    }

    return (
        <PageContainer>
            {movieLoading && (
                <div className="flex_center">
                    <Loader/>
                </div>
            )}
            {!movieLoading && data !== undefined && isSuccess ? (
                <div className="flex flex-col">
                    <div className="relative w-full">
                        <div className="absolute w-full h-full bg-gradient-to-t from-black to-[rgba(0,0,0,0.5)]"></div>
                        {data.backdrop_path ? <img src={`${import.meta.env.VITE_IMAGE_URL}${data.backdrop_path}`} alt={`image-backdrop-${data?.title}`} className="rounded-t-xl h-auto"/> : null}
                    </div>
                    <div className="bg-black min-h-[100px] rounded-b-xl">
                        <Detail 
                            data={data}
                            handleShowVideo={() => handleShowVideo(true)}/> 
                        {imagesCollection ? <Collection data={{
                            name: data.belongs_to_collection.name || "Images Collection",
                            postersURL: imagesCollection
                        }}/> : null}
                    </div>
                </div>
            ) : null}
            {isError ? <ErrorMessage message="Error, Something went wrong" /> : null}
            {showVideo && movieVideo ? (
                <Modal handleClose={() => setShowVideo(false)} classes="p-5">
                    <VideoPlayer url={movieVideo}/>
                </Modal>
            ) : null}
        </PageContainer>
    )
}

export default MovieDetail