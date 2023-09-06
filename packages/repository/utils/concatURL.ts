export function concatURL(...url: URLparams[]) {
    let result = ""
    for (let e of url) {
        if (e === undefined || e === null || e === "") break
        result += e.toString()
    }

    return result
}

type URLparams = string | number | symbol | undefined
