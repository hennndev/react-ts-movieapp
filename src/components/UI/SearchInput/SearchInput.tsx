import { useState } from 'react'
import { BiSearchAlt } from 'react-icons/bi'

type PropsTypes = {
    searchTerm: string  
    handleChangeSearchTerm: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void 
}

const SearchInput = (props: PropsTypes) => {
    const [isFocus, setIsFocus] = useState<boolean>(false)
    return (
        <>
            <form onSubmit={props.handleSubmit} className={`sm:w-[400px] lg:w-[500px] hidden md:flexx pl-4 pr-5 rounded-full border ${isFocus ? "scale-[1.02] border-primary-color" : "border-gray-700"} transition duration-200 ease-in-out`}>
                <button type="submit" className="border-none outline-none cursor-pointer mr-3 rounded-full">
                    <BiSearchAlt className={`text-xl text-gray-400 hover:text-primary-color transition duration-200 ease-in-out`}/>
                </button>
                <input type="text" onBlur={() => setIsFocus(false)} onFocus={() => setIsFocus(true)}
                    className="flex-1 py-2.5 text-gray-400 text-sm bg-transparent outline-none mr-2" 
                    value={props.searchTerm} onChange={props.handleChangeSearchTerm}
                    placeholder="Search movies/tv shows"/>
                <button className="border-none outline-none font-extrabold text-white text-sm">FIND</button>
            </form>
        </>
    )
}

export default SearchInput