/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['https://image.tmdb.org/']
    },
    env: {
        API_KEY: process.env.REACT_API_KEY
    }
}

module.exports = nextConfig
