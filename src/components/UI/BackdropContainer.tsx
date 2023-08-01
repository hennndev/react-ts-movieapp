import React from 'react'
import { Swiper } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'

type PropsTypes = {
    children: React.ReactNode
}
const BackdropContainer = ({children}: PropsTypes) => {
    return (
        <Swiper
            watchOverflow={true}
            pagination={{
                clickable: true,
                dynamicBullets: true,
            }}
            autoplay={{
                delay: 3500,
                disableOnInteraction: false,
            }}
            modules={[Pagination, Autoplay]}
            className="flex-1">
            {children}
        </Swiper>
    )
}
export default BackdropContainer