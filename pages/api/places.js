// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'


export const getPlacesData = async(type,sw,ne)=>{
  const URL = `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`
  try {
    const options = {
      params: {
        bl_latitude: sw.lat,
        tr_latitude: ne.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
      },
      headers: {
        'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
        'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_API_KEY
      }
    }
    console.log(process.env.NEXT_PUBLIC_RAPIDAPI_API_KEY)
    const {data:{data}} = await axios.get(URL,options)
    return data
  } catch (error) {
    console.log(error)
  }
}