import { useNavigate } from 'react-router-dom'

const PageNotFound = () => {
    const navigate = useNavigate()    
    return (
        <section className="w-full h-full flex_center flex-col mt-[200px] text-center px-10">
            <h1 className="text-white mb-5 font-semibold text-lg">Oops, page not found. Back to home by click this button.</h1>
            <button className="bg-primary-color button px-6 button_hover" onClick={() => navigate("/")}>
                Back to home
            </button>
        </section>
    ) 
}
export default PageNotFound