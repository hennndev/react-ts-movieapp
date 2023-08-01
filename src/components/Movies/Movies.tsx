import Movie from './Movie'
import { MoviesTypes, MovieTypes } from '../../types/Movies.types'

type PropsTypes = {
    data: MoviesTypes,
    title: string,
    isBookmark?: boolean
}
const Movies = ({data, title, isBookmark}: PropsTypes) => {
    return (
        <section className="flex flex-col px-3 mt-7 lg:px-0">
            <h1 className="mb-8 text-2xl text-white font-bold capitalize">
                {title.includes("_") ? title.replace("_", " ") : title}
            </h1>
            <section className="grid grid-cols-card-mobile md:grid-cols-card-desktop gap-[20px]">
                {data.map((movie: MovieTypes) => (
                    <Movie key={movie.id} data={movie} isBookmark={isBookmark}/>
                ))}
            </section>
        </section>
    )
}

export default Movies