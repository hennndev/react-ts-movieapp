import { useState } from 'react'

const usePagination = () => {

    const [page, setPage] = useState(1)

    return {
        page, setPage
    }
}

export default usePagination