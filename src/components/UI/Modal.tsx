import React from 'react'

type PropsTypes = {
    children: React.ReactNode,
    classes?: string,
    handleClose?: () => void
}
const Modal = ({children, classes, handleClose}: PropsTypes) => {
    return (
        <div className={`fixed min-h-screen top-0 right-0 left-0 bottom-0 w-full z-[100] flex_center bg-[rgba(0,0,0,0.4)] ${classes ? classes : ""}`} onClick={() => handleClose && handleClose()}>
            {children}
        </div>
    )
}
export default Modal