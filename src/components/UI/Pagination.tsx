import { useState, useEffect } from 'react'
import queryString from 'query-string'
import { handleQueries } from '../../utils/utils'
import { useLocation, useNavigate } from 'react-router-dom'

type PropsTypes = {
    currentMoviesLength: number,
    totalMovies: number,
    totalPages: number
}

const Pagination = ({currentMoviesLength, totalMovies, totalPages}: PropsTypes) => {
    const location = useLocation()
    const navigate = useNavigate()
    const [page, setPage] = useState<number>(1)
    const queries = queryString.parse(location.search)
    const total_pages = totalPages >= 10 ? 10 : totalPages
    const pathname = location.pathname === "/" ? "" : location.pathname

    const handleNext = (value: number): void => {
        let currentQueries
        if(value <= total_pages) {
            setPage(value)
            currentQueries = handleQueries({...queries, page: value})
            navigate(`${pathname}${currentQueries}`)
        } 
    }

    const handlePrev = (value: number): void => {
        setPage(value)
        let currentQueries
        if(value === 1) {
            delete queries.page
            currentQueries = handleQueries({...queries})
        } else {
            currentQueries = handleQueries({...queries, page: value})
        }
        navigate(`${pathname}${currentQueries}`)
    }

    useEffect(() => {
        if(queries?.page) {
            setPage(+queries?.page)
        } else {
            setPage(1)
        }
    }, [queries.page])
    
    return (
        <section className="flexx flex-col mt-5">
            <div className="text-gray-400 mb-3">
                Showing {" "}
                <span className="text-base text-white font-medium mx-[2px]">
                    {((+page - 1) * 20) + 1}
                </span> 
                {" "} to {" "}
                <span className="text-base text-white font-medium mx-[2px]">
                    {currentMoviesLength === 20 ? +page * 20 : ((+page - 1) * 20) + currentMoviesLength}
                </span> 
                {" "} of {" "}
                <span className="text-base text-white font-medium mx-[2px]">
                    {total_pages >= 10 ? 200 : totalMovies}
                </span> 
                {" "} movies
            </div>
            <div className="flexx">
                <button 
                    className={`border-none outline-none px-4 py-2 text-white rounded-s-lg ${+page === 1 ? "bg-[#332C39] cursor-not-allowed" : "cursor-pointer bg-[#393646] hover:bg-[#332C39]"}`} 
                    disabled={+page === 1} 
                    onClick={() => handlePrev(+page === 1 ? 1 : +page - 1)}>
                        Prev
                </button>
                <span className="text-white text-lg mx-4 font-bold">{!queries.page ? 1 : queries.page}</span>
                <button 
                    className={`border-none outline-none px-5 py-2 text-white rounded-e-lg ${+page === total_pages ? "bg-[#332C39] cursor-not-allowed" : "cursor-pointer bg-[#393646] hover:bg-[#332C39]"}`} 
                    disabled={+page === total_pages} 
                    onClick={() => handleNext(+page === total_pages ? total_pages : +page + 1)}>
                        Next
                </button>
            </div>
        </section>
    )
}

export default Pagination
