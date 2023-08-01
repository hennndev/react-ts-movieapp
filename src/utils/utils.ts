import { ParsedQuery } from "query-string"

type QueriesTypes = {
    [key: string]: string | number
}

export const delay = () => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, 1500)
    })
}
export const handleQueries = (queries: ParsedQuery | QueriesTypes): string => {
    let queriesStr = ""
    if(queries.page && (+queries.page > 10 || +queries.page < 1)) queries.page = 0
    Object.keys(queries).forEach((key, index) => {
        queriesStr += `${index === 0 ? "?" : "&"}${key}=${queries[key]}`
    })
    return queriesStr
}
