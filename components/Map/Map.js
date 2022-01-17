import GoogleMapReact from 'google-map-react'
import Image from "next/image"
import Script from "next/script"
import { Paper, Typography, useMediaQuery} from "@material-ui/core"
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined"
import Rating from "@material-ui/lab/Rating"
import useStyles from './styles'
import mapStyles from "./mapStyles"

export default function Map({coordinates,setCoordinates,setBounds,places, setChildClicked,weatherData}){
  const classes = useStyles();
  const isDesktop = useMediaQuery('(min-width:600px)');

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{key:process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}}
        center={coordinates}
        defaultZoom={14}
        margin={[50,50,50,50]}
        options={{
          disableDefaultUI: true,
          zoomControl:true,
          styles:mapStyles
        }}
        onChange={(e)=>{
          setCoordinates({lat:e.center.lat, lng:e.center.lng})
          setBounds({ne:e.marginBounds.ne, sw: e.marginBounds.sw})
        }}
        onChildClick={(child)=> setChildClicked(child)}
      >
        {places?.map((place,index)=>(
          <div key={`place-${index}`} className={classes.markerContainer}
              lat={Number(place.latitude)}
              lng={Number(place.longitude)}          
          >
            {
              !isDesktop?(<LocationOnOutlinedIcon color="primary" fontSize="large"/>)
              : (
                <Paper elevatio={3} className={classes.paper}>
                  <Typography className={classes.typography} variant="subtitle2" gutterBottom>
                    {place.name}
                  </Typography>
                  <Image 
                    className={classes.pointer}
                    src={place.photo
                      ? place.photo.images.large.url
                      : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
                  }
                    alt={place.name}
                    width="30"
                    height="30"

                  />
                  <Rating size="small" value={Number(place?.rating)} readOnly />
                </Paper>
              )
            }
          </div>
        ))}
        {weatherData?.list?.map((data,index)=>(
          <div key={`weather-${index}`} lat={data.coord.lat} lng={data.coord.lon}>
            <Image src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt="weather" height="120"width="120"/>
          </div>
        ))}
      </GoogleMapReact>
    </div>
  )
}