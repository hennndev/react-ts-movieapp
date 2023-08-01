import queryString from 'query-string'
import { useLocation, useNavigate } from 'react-router-dom'
import { handleQueries } from '../../utils/utils'


type PropsTypes = {
    data: Array<{
        id: number,
        name: string
    }>
}
const MoviesGenres = ({data}: PropsTypes) => {

    const navigate = useNavigate()
    const location = useLocation()
    const queries = queryString.parse(location.search)
    const pathname = location.pathname === "/" ? "" : location.pathname

    const handleClick = (value: number | string) => {
        let currentQuerries
        if(typeof value === "string") {
            delete queries.with_genres
            currentQuerries = handleQueries({...queries})
        } else {
            delete queries.page
            currentQuerries = handleQueries({...queries, with_genres: value})
        }
        navigate(`${pathname}${currentQuerries}`)
    }

    return (
        <div className="flexx overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 mt-5">
            <div className="mr-2 px-3 py-2" onClick={() => handleClick("all")}>
                <p className="text-gray-600 font-medium whitespace-nowrap cursor-pointer hover:text-primary-color transition duration-400 hover:scale-[1.05]">All Category</p>
            </div>
            {data.map(genre => (
                <div key={genre.id} className="mr-2 px-3 py-2" onClick={() => handleClick(genre.id)}>
                    <p className={`font-medium whitespace-nowrap cursor-pointer hover:text-primary-color transition duration-400 hover:scale-[1.05] ${queries.with_genres && +queries.with_genres === genre.id ? "text-primary-color scale-[1.05]" : "text-gray-600"}`}>{genre.name}</p>
                </div>
            ))}
        </div>
    )
}

export default MoviesGenres