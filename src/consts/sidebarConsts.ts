import { TbDeviceDesktopStar } from 'react-icons/tb'
import { MdLocalPlay, MdUpcoming} from 'react-icons/md'
import { BiTrendingUp, BiMoviePlay, BiBookmarkAlt, BiGroup, BiCog, BiHelpCircle } from 'react-icons/bi'

export const sidebarMovieList =[
    {
        queryKey: "movie",
        queryVal: "now_playing",
        name: "Now Playing",
        Icon: BiMoviePlay,
    },
    {
        queryKey: "movie",
        queryVal: "popular",
        name: "Popular",
        Icon: TbDeviceDesktopStar
    },
    {
        queryKey: "movie",
        queryVal: "trending",
        name: "Trending",
        Icon: BiTrendingUp,
    },
    {
        queryKey: "movie",
        queryVal: "top_rated",
        name: "Top Rated",
        Icon: MdLocalPlay
    },
    {
        queryKey: "movie",
        queryVal: "upcoming",
        name: "Upcoming",
        Icon: MdUpcoming
    },
]

export const sidebarMenuList = [
    {
        path: "bookmarked",
        name: "Bookmarked",
        Icon: BiBookmarkAlt,
    },
    {
        path: "community",
        name: "Community",
        Icon: BiGroup,
    },
    {
        path: "setting",
        name: "Setting",
        Icon: BiCog,
    },
    {
        path: "help",
        name: "Help",
        Icon: BiHelpCircle,
    },
]