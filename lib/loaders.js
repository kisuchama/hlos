export const bannerLoader = ({ src, width, quality }) => {
    return `/images/${src}/main.jpg?w=${width}&q=${quality || 100}`
}

export const chibiLoader = ({ src, width, quality }) => {
    return `https://res.cloudinary.com/kisu/image/upload/${src}/chibi.png?w=${width}&q=${quality || 80}`
}