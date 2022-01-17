
import Head from 'next/head'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import {useEffect, useState} from 'react'
import styles from '../styles/Home.module.scss'
import {getPlacesData} from '../pages/api/places'
import {getWeatherData} from '../pages/api/weather'
import {CssBaseline, Grid} from "@material-ui/core"

import {Header} from './Header/Header'
const Map = dynamic(()=>import('./Map/Map'),{ssr:false})
const List = dynamic(()=>import('./List/List'),{ssr:false})

export default function Page(){
  const [childClicked, setChildClicked] = useState(null)
  const [type, setType] = useState('restaurants')
  const [rating,setRating]=useState(0);
  const [places, setPlaces] = useState([])
  const [weatherData, setWeatherData] = useState([])
  const [filteredPlaces, setFilteredPlaces] = useState([])
  const [coordinates, setCoordinates] = useState({lat:0,lng:0})
  const [bounds, setBounds] = useState({})
  const [autComplete, setAutComplete] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(({coords:{latitude,longitude}})=>{
      setCoordinates({lat:latitude,lng:longitude})
    })
  },[])
  useEffect(()=>{
    const placesArray = places?.filter((place)=>place.rating>rating)
    setFilteredPlaces(placesArray)
  },[rating])
  useEffect(()=>{
    if(bounds.sw &&bounds.ne){
      setIsLoading(true)
      getWeatherData(coordinates.lat,coordinates.lng)
        .then((data)=>setWeatherData(data))
      getPlacesData(type,bounds.sw,bounds.ne)
        .then((data)=>{
          setPlaces(data?.filter((place)=>place.name&&place.num_reviews >0))
          setFilteredPlaces([])
          setIsLoading(false)
        });
    }
  },[bounds,type])
  const onLoad= (autoC)=> setAutComplete(autoC);
  const onPlaceChanged=()=>{
    const lat = autComplete.getPlace().geometry.location.lat()
    const lng = autComplete.getPlace().geometry.location.lng()
    setCoordinates({lat,lng})
  }
  //Posible multiple uso de useEffect, pero tener en cuenta las dependencias
  return (
    <>
    <CssBaseline></CssBaseline>       
    <Header onLoad={onLoad} onPlaceChanged={onPlaceChanged} setCoordinates={setCoordinates}></Header>
    <Grid container spacing={3} style={{width:'100%'}}>
      <Grid item xs={12} md={4}>
        <List type={type} setType={setType} rating={rating} setRating={setRating} places={filteredPlaces?.length?filteredPlaces:places} childClicked={childClicked} isLoading={isLoading}></List>
      </Grid>
      <Grid item xs={12} md={8}>
        <Map places={filteredPlaces?.length?filteredPlaces:places} setCoordinates={setCoordinates} setBounds={setBounds} coordinates={coordinates} setChildClicked={setChildClicked} weatherData={weatherData}></Map>
      </Grid>
    </Grid>
    </>
    )
}
