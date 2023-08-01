import { useData } from '../context/context'
import { useNavigate } from 'react-router-dom'
import Movies from '../components/Movies/Movies'
import PageContainer from '../components/UI/Layout/PageContainer'

const Bookmarked = () => {

    const navigate = useNavigate()
    const { bookmarkMovies } = useData()
    return (
        <PageContainer>
            {bookmarkMovies.length < 1 && (
                <div className="flex_center flex-col mt-[100px] px-10">
                    <h1 className="text-gray-200 mb-5 font-bold text-lg text-center">
                        Your bookmark movies still empty, find your favorite movies by click this button
                    </h1>
                    <button className="bg-primary-color px-4 py-2 text-gray-200 border-none outline-none rounded-lg cursor-pointer" onClick={() => navigate("/")}>
                        Find movies
                    </button>
                </div>
            )}
            {bookmarkMovies.length > 0 && (
                <Movies data={bookmarkMovies} title="My Favorite Collection" isBookmark={true}/>
            )}
        </PageContainer>
    )
}

export default Bookmarked