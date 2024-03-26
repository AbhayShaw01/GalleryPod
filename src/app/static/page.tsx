import Image from "next/image";
import {Alert} from "@/components/bootsrap";
import type {Metadata} from "next";
import {UnsplashImg} from "@/models/unsplash-image";
import { title } from "process";


export const metadata: Metadata = {
    title: "Static Fetching",
};
export default async function UnsplashImage(){
    const response = await fetch('https://api.unsplash.com/photos/random/?client_id='+process.env.UNSPLASH_ACCESS_KEY);
    const image:UnsplashImg = await response.json();
    const width = Math.min(500,image.width);
    const height = (width/image.width)*image.height;
    return(
        <div className="d-flex flex-column align-items-center">
            <Alert>
            This page <strong>fetches and catches data at build time.</strong> Even though Unsplash API always return new Image we see same image even after refresh until the project is compiled again.
            </Alert>
            <Image src={image.urls.raw} alt={image.description} width={width} height={height} className="rounded shadow mw-100 h-100"/>
            
            <p>Created by :- {image.user.username}</p>

        </div>

    )
}