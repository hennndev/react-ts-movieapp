// modules
import { useState, useEffect } from 'react'
import queryString from 'query-string'
import { toast } from 'react-hot-toast'
import { useNavigate, useLocation } from 'react-router-dom'
// utils
import { useData } from '../../../context/context'
// components & icons
import Modal from '../Modal'
import { BiSearchAlt } from 'react-icons/bi'
import SearchInput from '../SearchInput/SearchInput'
import SearchInputModal from '../SearchInput/SearchInputModal'
import { MdMenu, MdOutlineAccountCircle } from 'react-icons/md'

  

const Navbar = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const queries = queryString.parse(location.search)
    const query = queries["query"] ? queries["query"] : ""
    const [searchTerm, setSearchTerm] = useState<string>("")
    const { handleSidebar, showSearchModal, handleShowSearchModal } = useData()

    const handleChangeSearchTerm = (e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(!searchTerm) {
            return
        } 
        handleShowSearchModal(false)
        navigate(`/movies?query=${searchTerm}`)
    }

    useEffect(() => {
        if(queries.query) {
            setSearchTerm(String(queries.query))
        } else {
            setSearchTerm("")
        }
    }, [queries.query])
    const handleClick = () => {
        toast('Comming soon!', {
            icon: '😢',
        });
    }
    

    return (
        <>
            <header className="w-full flex_between pt-8 pb-5 px-5 lg:px-10 z-50 bg-[#181818]">
                <div className="flexx">
                    <MdMenu 
                        className="xl:hidden text-2xl text-gray-500 cursor-pointer hover:text-gray-200 transition duration-200 mr-5" 
                        onClick={() => handleSidebar(true)}/>
                    <BiSearchAlt className={`text-xl block md:hidden cursor-pointer mr-3 text-gray-400 hover:text-primary-color transition duration-200 ease-in-out`} onClick={() => handleShowSearchModal(true)}/>
                    <SearchInput 
                        searchTerm={searchTerm} 
                        handleChangeSearchTerm={handleChangeSearchTerm}
                        handleSubmit={handleSubmit}/>
                </div> 
                <div className="flexx">
                    <button className="button bg-primary-color button_hover mr-3 py-1.5" onClick={handleClick}>Berlangganan</button>
                    <MdOutlineAccountCircle className="text-gray-500 text-2xl cursor-pointer hover:text-primary-color hover:scale-[1.02] transition duration-200" onClick={handleClick}/>
                </div>  
            </header>
            {showSearchModal && (
                <Modal classes="md:hidden">
                    <SearchInputModal
                        searchTerm={searchTerm} 
                        handleShowSearchModal={() => handleShowSearchModal(false)}
                        handleChangeSearchTerm={handleChangeSearchTerm}
                        handleSubmit={handleSubmit}/>
                </Modal>
            )}
        </>
    )
}

export default Navbar