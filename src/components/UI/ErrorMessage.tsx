type PropsTypes = {
    message: string,
    retryFetch?: boolean,
    handleClick?: () => void
}
const ErrorMessage = ({message, retryFetch, handleClick}: PropsTypes) => {
    return (
        <div className="flex_center flex-col space-y-2">
            <p className="text-primary-color font-medium">{message}</p>
            {retryFetch ? (
                <button 
                    className="button bg-primary-color button_hover rounded-md" 
                    onClick={handleClick}>Retry</button>
            ) : null}
        </div>
    )
}
export default ErrorMessage