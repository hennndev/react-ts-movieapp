// modules
import { useEffect, useState } from 'react'
import queryString from 'query-string'
import { useLocation } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
// components & icons
import Loader from '../components/UI/Loader'
import Movies from '../components/Movies/Movies'
import Pagination from '../components/UI/Pagination'
import ErrorMessage from '../components/UI/ErrorMessage'
import PageContainer from '../components/UI/Layout/PageContainer'
import MovieBackdrop from '../components/Movies/BackdropImageMovies'
// utils 
import { baseURL } from '../config/instance'
import { handleQueries } from '../utils/utils'
import { MoviesTypes } from '../types/Movies.types'

const MoviesPage = () => {
    const location = useLocation()
    const [errorStatus, setErrorStatus] = useState<boolean | null>(null)
    const queries = queryString.parse(location.search)
    const page = queries.page ? queries["page"] : 1
    let urlPath = "movie/now_playing"
    let queryValue = "now_playing"
    if(queries.query) {
        urlPath = `search/movie`
        queryValue = String(queries.query)
    }
    if(queries.movie) {
        urlPath = queries.movie === "trending" ? `trending/movie/week` : `movie/${queries.movie}`
        queryValue = queries.movie === "trending" ? "trending" : String(queries.movie)
    }

    const getMovies = async (): Promise<{total_movies: number, total_pages: number, results: MoviesTypes}> => {
        let currentQueries = handleQueries({...queries})
        currentQueries = currentQueries.includes("?") ? currentQueries.replace("?", "&") : currentQueries
        const response = await baseURL({
            url: `${urlPath}?api_key=${import.meta.env.VITE_API_KEY}${currentQueries}`,
            method: "GET"
        })
        return {
            total_movies: response.data.total_results,
            total_pages: response.data.total_pages,
            results: response.data.results
        }
    }
    const { data, isLoading, isSuccess, isError} = useQuery(
        ["movies", page, queryValue],
        getMovies,
        {
            refetchOnWindowFocus: false,
            retry: false,
            staleTime: 1000 * 60 * 60 
        }
    )

    useEffect(() => {
        if(data?.total_pages && +page > data?.total_pages) {
            setErrorStatus(true)
        } else {
            setErrorStatus(false)
        }
    }, [data?.total_pages, page])

    return (
        <PageContainer>
            {isLoading && <Loader/>}
            {!isLoading && data !== undefined && isSuccess && !errorStatus ? (
                <>
                    <MovieBackdrop data={data.results}/>
                    <Movies data={data.results} title={`${queryValue}`}/>
                    <Pagination 
                        currentMoviesLength={data.results.length}
                        totalMovies={data.total_movies} 
                        totalPages={data.total_pages}/>
                </>
            ): null}
            {isError || errorStatus ? <ErrorMessage message="Error, Something went wrong" /> : null}
        </PageContainer>
    )
}
export default MoviesPage