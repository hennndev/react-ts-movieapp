import { BiSearchAlt } from 'react-icons/bi'

type PropsTypes = {
    searchTerm: string
    handleShowSearchModal: () => void
    handleChangeSearchTerm: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void 
}
const SearchInputModal = (props: PropsTypes) => {

    return (
        <form onSubmit={props.handleSubmit} className={`flexx w-[95%] md:w-[400px] bg-[#181818] pr-4 pl-2 rounded-full border-2 border-[#EB455F] transition duration-200 ease-in-out`}>
            <button type="submit" className="border-none outline-none cursor-pointer mr-3 rounded-full">
                <BiSearchAlt className={`text-xl text-gray-400 hover:text-primary-color transition duration-200 ease-in-out`}/>
            </button>
            <input 
                type="text" 
                className="flex-1 py-2.5 text-white bg-transparent outline-none text-sm mr-1" 
                value={props.searchTerm} onChange={props.handleChangeSearchTerm}
                placeholder="Search movies/tv shows"/>
            <button type="button" className="border-none outline-none font-extrabold text-white text-sm" onClick={props.handleShowSearchModal}>ESC</button>
        </form>
    )
}

export default SearchInputModal