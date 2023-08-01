import { MovieTypes } from "./Movies.types"



interface MovieDetailTypes {
    belongs_to_collection: {
        backdrop_path: string
        id: number
        name?: string
        poster_path: string
    }
    budget: number
    genres: Array<{id: number, name: string}>
    imdb_id: string
    homepage: string
    production_companies: Array<{
        id: number,
        logo_path: string | null,
        name: string
        origin_country: string
    }>
    revenue: number
    runtime: number
    spoken_languages: Array<{
        english_name: string
        iso_639_1: string
        name: string
    }>
    status: string
    tagline: string

}

export type MovieDetailUnionTypes = MovieDetailTypes & MovieTypes