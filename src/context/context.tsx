import React, { useContext, createContext, useReducer, useEffect } from 'react'
import toast from 'react-hot-toast';
import { MoviesTypes, MovieTypes } from '../types/Movies.types'
import { reducer, initialState, ReducerActionType } from './reducer'

type AppProviderProps = {
    children: React.ReactNode
} 
type DataContextTypes = {
    isSidebar: boolean
    bookmarkMovies: MoviesTypes
    showSearchModal: boolean
    handleSidebar: (value: boolean) => void
    handleAddMovieToBM: (data: MovieTypes) => void
    handleDeleteMovieFromBM: (id: number) => void
    handleShowSearchModal: (value: boolean) => void
}

const Context = createContext({} as DataContextTypes)


export const AppProvider = (props: AppProviderProps) => {

    const [state, dispatch] = useReducer(reducer, initialState)
    // OPEN/CLOSE SIDEBAR
    const handleSidebar = (value: boolean) => {
        dispatch({
            type: ReducerActionType.HANDLE_SIDEBAR,
            payload: value
        })
    }
    // SHOW/CLOSE SEARCH MODAL
    const handleShowSearchModal = (value: boolean) => {
        dispatch({
            type: ReducerActionType.HANDLE_SHOW_SEARCH_MODAL,
            payload: value
        })
    }
    // ADD MOVIE
    const handleAddMovieToBM = (movie: MovieTypes) => {
        let updatedMoviesInBM = [...state.bookmarkMovies]
        const checkExistMovie = updatedMoviesInBM.find(data => data.id === movie.id)
        if(!checkExistMovie) {
            updatedMoviesInBM = [...updatedMoviesInBM, movie]
            localStorage.setItem("bookmarkMovies", JSON.stringify(updatedMoviesInBM))
            dispatch({
                type: ReducerActionType.ADD_MOVIE_TO_BM,
                payload: updatedMoviesInBM
            })
            toast.success("Movie has added to bookmark")
        } else {
            toast.error("Movie has been bookmarked")
        }
    }
    // DELETE MOVIE
    const handleDeleteMovieFromBM = (id: number) => {
        const updatedMoviesInBM = state.bookmarkMovies.filter((movie: { id: number }) => movie.id !== id)
        dispatch({
            type: ReducerActionType.DELETE_MOVIE_FROM_BM,
            payload: updatedMoviesInBM
        })
        localStorage.setItem("bookmarkMovies", JSON.stringify(updatedMoviesInBM))
        toast.success("Movie has deleted from bookmark")
    }

    useEffect(() => {    
        const close = (e: KeyboardEvent): void => {
            if(e.key === "Escape"){
                handleShowSearchModal(false)
                handleSidebar(false)
            }
        }
        document.addEventListener('keydown', close)      
        return () => document.removeEventListener('keydown', close)
    },[])


    return (
        <Context.Provider value={{
            isSidebar: state.isSidebar,
            bookmarkMovies: state.bookmarkMovies,
            showSearchModal: state.showSearchModal,
            handleSidebar,
            handleShowSearchModal,
            handleAddMovieToBM,
            handleDeleteMovieFromBM,
        }}>
            {props.children}
        </Context.Provider>
    )
   
}

export const useData = () => useContext(Context)
