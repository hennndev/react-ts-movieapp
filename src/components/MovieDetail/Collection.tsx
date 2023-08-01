type PropsTypes= {
    data: {
        name: string,
        postersURL: Array<string>
    }
}
const Collection = ({data}: PropsTypes) => {
    return (
        <div className="px-5 md:px-16 py-10 rounded-b-xl">
            <div>
                <h1 className="text-white font-bold text-xl">{data.name}</h1>
                <div className="flexx overflow-x-auto space-x-6 scrollbar scrollbar-thumb-gray-600 scrollbar-track-gray-900 mt-5 whitespace-nowrap">
                    {data.postersURL.map(poster => (
                        <img key={poster} src={`${import.meta.env.VITE_IMAGE_URL}${poster}`} alt="collection-image" className="w-[200px] h-[250px] bg-contain rounded-lg"/>
                    ))}
                </div>
            </div>             
        </div>
    )
}

export default Collection