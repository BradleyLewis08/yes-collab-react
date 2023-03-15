
import he from 'he'

export const unique = (arr) => {
    return arr.filter((item, i, ar) => ar.indexOf(item) === i);
}

export const containsHTML = (val) => {
    return /<\/?[a-z][\s\S]*>/i.test(val)
}

export const extractFromHTML = (htmlString) => {
    const stripedHtml = htmlString.replace(/<[^>]+>/g, '');
    const decodedStripedHtml = he.decode(stripedHtml);
    return decodedStripedHtml
}

export const extractHTMLContent = (str) => {
    return str ? str.replace(/<\/?[^>]+(>|$)/g, "") : ""
}