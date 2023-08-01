//moduls
import { Routes, Route, Outlet, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
// components
import Navbar from './components/UI/Layout/Navbar'
import Footer from './components/UI/Layout/Footer'
import Sidebar from './components/UI/Layout/Sidebar'
// pages
import Home from './pages/Home'
import MoviesPage from './pages/MoviesPage'
import Bookmarked from './pages/Bookmarked'
import MovieDetail from './pages/MovieDetail'
import PageNotFound from './pages/PageNotFound'

const App = () => {
    return (
        <main className="flex min-h-screen">
            <Routes>
                <Route element={<PrimaryLayout/>}>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/movies" element={<MoviesPage/>}/>
                    <Route path="/movies/:movieId" element={<MovieDetail/>}/>
                    <Route path="/bookmarked" element={<Bookmarked/>}/>
                </Route>
                <Route path="/page-not-found" element={<PageNotFound/>}/>
                {/* will redirect to page-not-found, if page is unknown or wrong page */}
                <Route path="*" element={<Navigate to="/page-not-found" replace/>}/> 
            </Routes>
        </main>
    )
}

const PrimaryLayout = () => {
    return (
        <>
            <Toaster/>
            <Sidebar/>
            <article className="w-full flex flex-col min-h-screen overflow-auto">
                <Navbar/>
                <Outlet/>
                <Footer/>
            </article>
        </>
    )
}
export default App