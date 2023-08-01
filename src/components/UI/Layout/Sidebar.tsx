// modules
import {IconType} from 'react-icons'
import queryString from 'query-string'
import { useNavigate, useLocation } from 'react-router-dom'
// utils & icons
import { FaWindowClose } from 'react-icons/fa'
import { useData } from '../../../context/context'
import { sidebarMovieList, sidebarMenuList } from '../../../consts/sidebarConsts'

type SidebarOptionTypes = {
    name: string
    Icon: IconType
}
type MovieListTypes = { //intersection types
    queryKey: string
    queryVal?: string
} & SidebarOptionTypes
type MenuTypes = { //intersection types
    path: string 
} & SidebarOptionTypes 

const Sidebar = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { handleSidebar, isSidebar } = useData()

    const handleClose = (value: boolean) => {
        handleSidebar(value)
    }
    const handleNavigate = (path: string) => {
        handleClose(false)
        navigate(path)
    }
    const pathname = location.pathname.split("/")[1]
    const queries = queryString.parse(location.search)
    const queriesKey = Object.keys(queries)

    return (
        <aside className={`fixed xl:sticky w-[250px] sm:w-[300px] xl:w-[300px] h-screen top-0 px-10 lg:px-16 py-10 xl:bg-transparent z-[99] xl:z-auto xl:transform-none transition duration-300 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 ${isSidebar ? "transform translate-x-0 bg-black" : "transform -translate-x-[300px]"}`}>            
            <div className="flex justify-end -mr-4 -mt-3">
            <FaWindowClose className="xl:hidden font-bold text-primary-color text-2xl cursor-pointer hover:scale-[0.90] transition duration-300" onClick={() => handleClose(false)}/>
            </div>
            <h1 className="text-white text-3xl font-bold cursor-pointer" onClick={() => handleNavigate("/")}>
                Net<span className="text-primary-color">Flex</span>
            </h1>
            <div className="mt-10">
                <div className="mb-10">
                    <h2 className="sidebar_sub_title">Movie List</h2>
                    <ul className="sidebar_options">
                        {sidebarMovieList.map(({Icon, ...data}: MovieListTypes) => (
                            <div key={data.name} 
                                className={`group sidebar_link ${queriesKey.includes(data.queryKey) && queries[data.queryKey] === data.queryVal ? "translate-x-1 text-white" : ""}`} 
                                onClick={() => handleNavigate(`/movies?${data.queryKey}=${data.queryVal}`)}>
                                <Icon className={`sidebar_link_icon ${queriesKey.includes(data.queryKey) && queries[data.queryKey] === data.queryVal ? "text-primary-color" : ""}`}/>
                                <li className="group-hover:text-white">{data.name}</li>
                            </div>
                        ))}
                    </ul>
                </div>
                <div className="mb-10">
                    <h2 className="sidebar_sub_title">Menu</h2>
                    <ul className="sidebar_options">
                        {sidebarMenuList.map(({Icon, ...data}: MenuTypes) => (
                            <div key={data.name} className={`group sidebar_link ${pathname === data.path ? "translate-x-1 text-white" : ""}`} onClick={() => handleNavigate(`/${data.path}`)}>
                                <Icon className={`sidebar_link_icon ${pathname === data.path ? "text-primary-color" : ""}`}/>
                                <li className="group-hover:text-white">{data.name}</li>
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        </aside>
    )
}
export default Sidebar