import { MoviesTypes } from "../types/Movies.types"

// type actions
export const enum ReducerActionType {
    HANDLE_SIDEBAR,
    HANDLE_SHOW_SEARCH_MODAL,
    HANDLE_SHOW_ALERT,
    ADD_MOVIE_TO_BM,
    DELETE_MOVIE_FROM_BM
}
// states
type StateTypes = {
    isSidebar: boolean,
    showSearchModal: boolean
    bookmarkMovies: MoviesTypes
}
// sidebar types
type SidebarTypes = {
    type: ReducerActionType.HANDLE_SIDEBAR,
    payload: boolean
}
// search modal types
type SearchModalTypes = {
    type: ReducerActionType.HANDLE_SHOW_SEARCH_MODAL
    payload: boolean
}
// movie types
type DataMoviesTypes = {
    type: ReducerActionType.ADD_MOVIE_TO_BM | ReducerActionType.DELETE_MOVIE_FROM_BM
    payload: MoviesTypes
}
// union all types
type ActionTypes = SidebarTypes | SearchModalTypes | DataMoviesTypes

// state by default
const bookmarkMovies = localStorage.getItem("bookmarkMovies")
export const initialState = {
    isSidebar: false,
    showSearchModal: false,
    bookmarkMovies: typeof bookmarkMovies === "string" ? JSON.parse(bookmarkMovies) : [] || []
}

export const reducer = (state: StateTypes, action: ActionTypes) => {
    switch(action.type) {
        case ReducerActionType.HANDLE_SIDEBAR:
            return {
                ...state,
                isSidebar: action.payload
            }
        case ReducerActionType.HANDLE_SHOW_SEARCH_MODAL:
            return {
                ...state,
                showSearchModal: action.payload
            }
        case ReducerActionType.ADD_MOVIE_TO_BM:
            return {
                ...state,
                bookmarkMovies: action.payload
            }
        case ReducerActionType.DELETE_MOVIE_FROM_BM:
            return {
                ...state,
                bookmarkMovies: action.payload
            }
        default:
            return state
    }
}