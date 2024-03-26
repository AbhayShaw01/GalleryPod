import { UnsplashImg } from '@/models/unsplash-image';
import Image from 'next/image';
import React from 'react'
import styles from "@/app/(SSR)/topics/[topics]/TopicsPage.module.css"
import { Metadata } from 'next';
import {Alert} from "@/components/bootsrap"

interface SearchProps{
    params:{topics :string},
}
export function generateMetadata({params:{topics}}:SearchProps):Metadata{
    return {
        title:topics
    }
}

export  function generateStaticParams() {
  return  ["health","yoga","games","motivation","science","coding"].map(topic=>({topic}));
    
}
export default async function Page({params:{topics}}:SearchProps) {
    const response =await fetch(`https://api.unsplash.com/photos/random/?query=${topics}&count=30&client_id=${process.env.UNSPLASH_ACCESS_KEY}`);
    const images:UnsplashImg[] = await response.json();
  return (<div>
    <Alert>
        This page uses <strong>generateStaticParams</strong>to render and cache static pages at build time. Pages that are not included in generateStaticParams will be fetched and rendered on access and then cached for subsequent request.
    </Alert>
  <h1>{topics.toUpperCase()}</h1>
     {
        images.map((image)=><Image src={image.urls.raw} width={200} height={200} alt={image.description} key={image.urls.raw}  className={styles.image}/>)
     }
  </div>
    
  )
}
