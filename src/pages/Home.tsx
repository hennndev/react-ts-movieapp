// utils & types
import { baseURL } from '../config/instance'
import { handleQueries } from '../utils/utils'
import { MoviesTypes } from '../types/Movies.types'
import { generateGenresMovies } from '../consts/genresConsts'
// modules
import queryString from 'query-string'
import { useLocation } from 'react-router-dom'
import { useQueries } from '@tanstack/react-query'
// components & icons
import Loader from '../components/UI/Loader'
import Movies from '../components/Movies/Movies'
import Pagination from '../components/UI/Pagination'
import ErrorMessage from '../components/UI/ErrorMessage'
import MoviesGenres from '../components/Movies/MoviesGenres'
import PageContainer from '../components/UI/Layout/PageContainer'
import MovieBackdrop from '../components/Movies/BackdropImageMovies'

const Home = () => {

    const location = useLocation()
    const queries = queryString.parse(location.search)
    const page = queries.page ? queries["page"] : 1
    const with_genres = queries.with_genres ? queries["with_genres"] : "all"
    
    const getMovies = async(): Promise<{total_movies: number, total_pages: number, results: MoviesTypes}> => {
        let pathURL
        let currentQueries = handleQueries({...queries})
        if(queries.with_genres && with_genres !== "all") {
            pathURL = "discover/movie"
        } else {
            pathURL = "movie/popular"
        }
        currentQueries = currentQueries.includes("?") ? currentQueries.replace("?", "&") : currentQueries
        const response = await baseURL({
            url: `${pathURL}?api_key=${import.meta.env.VITE_API_KEY}${currentQueries}`,
            method: "GET"
        })
        return {
            total_movies: response.data.total_results,
            total_pages: response.data.total_pages,
            results: response.data.results
        }
    }

    const [{data: moviesData, ...moviesQuery}, {data: moviesGenresData}] = useQueries({
        queries: [
            {
                queryKey: ["movies", page, with_genres], 
                queryFn: getMovies,
                refetchOnWindowFocus: false,
                retry: false,
                staleTime: 1000 * 60 * 60,
            },
            {
                queryKey: ["movies_genres"],
                queryFn: async (): Promise<void> => {
                    const response = await baseURL({
                        url: `genre/movie/list?api_key=${import.meta.env.VITE_API_KEY}`,
                        method: "GET"
                    })
                    return response.data.genres
                },
                refetchOnWindowFocus: false,
                retry: false,
                staleTime: 1000 * 60 * 60 
            }
        ]
    })

    return (
        <PageContainer>
            {moviesQuery.isLoading ? <Loader/> : null}
            {!moviesQuery.isLoading && moviesQuery.isSuccess && moviesData !== undefined && moviesGenresData !== undefined ? (
                <>
                    <MovieBackdrop data={moviesData.results}/>
                    <MoviesGenres data={moviesGenresData}/> 
                    <Movies data={moviesData.results} 
                        title={`${queries.with_genres ? generateGenresMovies[+queries.with_genres] : "Movies (Now Playing)"}`}/>
                    <Pagination currentMoviesLength={moviesData.results.length}
                        totalMovies={moviesData.total_movies} 
                        totalPages={moviesData.total_pages}/>
                </>
            ) : null} 
            {moviesQuery.isError ? 
                <ErrorMessage 
                    message="Error, Something went wrong" 
                    retryFetch={true}
                    handleClick={() => moviesQuery.refetch()}/> : null
            }
        </PageContainer>
    )
}
export default Home