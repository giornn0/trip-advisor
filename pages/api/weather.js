import axios from "axios"
const URL = 'https://community-open-weather-map.p.rapidapi.com/find'

export const getWeatherData = async (lat,lon)=>{
  try {
    const options = {
      params: {
        lat,
        lon,
      },
      headers: {
        'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
        'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_API_KEY
      }
    };
    const {data} = await axios.get(URL,options)
    return data
  } catch (error) {
    console.log(error)
  }
}