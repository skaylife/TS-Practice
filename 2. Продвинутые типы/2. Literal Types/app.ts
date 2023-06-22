function fetchWithAuth(url: string, method: 'post' | 'get'): 1 | -1 {
    return -1
}
fetchWithAuth('a', 'post')

let method = 'pos2'

fetchWithAuth('s', method as 'post')