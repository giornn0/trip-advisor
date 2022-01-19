import Script from 'next/script'
import dynamic from 'next/dynamic'
import {useEffect, useState} from 'react'
import styles from '../styles/Home.module.scss'
import {getPlacesData} from './api/places'
import {CssBaseline, Grid} from "@material-ui/core"

import {Header} from '../components/Header/Header'
import Page from '../components/Page'

export default function Home() {
  return (
    <>
    <Script src={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`} strategy="beforeInteractive"/>
    <Page></Page>
    </>
  )
}
