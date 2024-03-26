import { UnsplashImg } from '@/models/unsplash-image';
import React from 'react';
import {Alert} from "@/components/bootsrap";
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Dynamic Fetching",
};

export default async function UnsplashImage() {
    const response= await fetch('https://api.unsplash.com/photos/random/?client_id='+process.env.UNSPLASH_ACCESS_KEY,{
        next:{revalidate:0}
    });
    const image:UnsplashImg = await response.json();
    const width =Math.min(500,image.width);
    const height =(width/image.width)*image.height;
  return (
    <div className="d-flex flex-column align-items-center">
            <Alert>
            This page <strong>fetches data dynamically.</strong> Ever time you refresh the page  you get a new Image.
            </Alert>
            <Image src={image.urls.raw} alt={image.description} width={width} height={height} className="rounded shadow mw-100 h-100"/>
            
            <p>Created by :- {image.user.username}</p>

        </div>
  )
}
