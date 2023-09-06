import queryString from "query-string"

export function withQuery<T>(uri: string, query?: T) {
    return query ? uri + "?" + queryString.stringify(query) : uri
}

export type Query<T> = Partial<T> | {}
