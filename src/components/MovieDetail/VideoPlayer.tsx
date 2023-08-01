import ReactPlayer from 'react-player/youtube'

type PropsTypes = {
    url: string
}

const VideoPlayer = ({url}: PropsTypes) => {
    return (
        <ReactPlayer playing controls url={`https://www.youtube.com/watch?v=${url}`}/>
    )
}

export default VideoPlayer