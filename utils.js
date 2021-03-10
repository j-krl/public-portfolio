
export function watchSort(data) {
    const dataCopy = JSON.parse(JSON.stringify(data))
    const sortedData = dataCopy.sort((a, b) => a.watch_number - b.watch_number)
    return sortedData
}

export function alphaSort(data) {
    const dataCopy = JSON.parse(JSON.stringify(data))
    const sortedData = dataCopy.sort((a, b) => {
        let a_mod = a.title
        let b_mod = b.title
        if (a.title.substr(0, 4) === 'The ') a_mod = a.title.slice(4)
        if (b.title.substr(0, 4) === 'The ') b_mod = b.title.slice(4)
        if (a_mod < b_mod) return -1
        if (a_mod > b_mod) return 1
        else return 0
    })
    return sortedData
}

export function ratingSort(data) {
    const dataCopy = JSON.parse(JSON.stringify(data))
    const sortedData = dataCopy.sort((a, b) => {
        let a_mod =
            a.reviews.reduce((acc, val) => acc + val.rating, 0) /
            a.reviews.length
        let b_mod =
            b.reviews.reduce((acc, val) => acc + val.rating, 0) /
            b.reviews.length
        if (a_mod > b_mod) return -1
        if (a_mod < b_mod) return 1
        else if (a.reviews.length < b.reviews.length) return 1
        else if (a.reviews.length > b.reviews.length) return -1
        else return 0
    })
    return sortedData
}

export function dateConvert(ISOdate) {
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ]
    let date = new Date(ISOdate)
    date = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
    return date
}
