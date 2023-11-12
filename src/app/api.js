import axios from 'axios';

const baseUrl = 'https://api.themoviedb.org/3/'

const axiosInstance = axios.create({
    baseURL: baseUrl,
});

export const getTrendMovies = async (type) => {
    try {
        const response = await axiosInstance.get(`trending/${type}/week?api_key=4bff102e133b1408d03aba87d5056132`)
        return response.data.results
    }
    catch (error) {
        console.log(error)
    }
}

export const getMovie = async (type, id) => {
    try {
        const response = await axiosInstance.get(`${type}/${id}?api_key=4bff102e133b1408d03aba87d5056132`)
        return response.data
    }
    catch (error) {
        console.log(error)
    }
}

export const getRecommendations = async (type, id) => {
    try {
        const response = await axiosInstance.get(`${type}/${id}/recommendations?api_key=4bff102e133b1408d03aba87d5056132`)
        return response.data.results
    }
     catch (error) {
        console.log(error)
    }
}
