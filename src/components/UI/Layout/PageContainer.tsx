import React from 'react'

type PageContainerPropsType = {
    children: React.ReactNode
}

const PageContainer = (props: PageContainerPropsType) => {
    return (
        <article className="pt-5 lg:px-10 mb-20">
            {props.children}
        </article>
    )
}

export default PageContainer