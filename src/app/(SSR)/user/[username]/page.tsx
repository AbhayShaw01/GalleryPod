import { UnsplashUser } from "@/models/unsplash-user";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";
import { Alert } from "@/components/bootsrap";
interface Userprops {
  params: { username: string };
}

async function getUser(username: string): Promise<UnsplashUser> {
  const response = await fetch(
    `https://api.unsplash.com/users/${username}?client_id=${process.env.UNSPLASH_ACCESS_KEY}`
  );

  if (response.status === 400) notFound();

  return await response.json();
}
export async function generateMetadata({
  params: { username },
}: Userprops): Promise<Metadata> {
  const user = await getUser(username);

  return {
    title:
      ([user.first_name, user.last_name]
        .filter(Boolean)
        .join(" ")
        .toUpperCase() || user.username) + "- NextJs Image Gallery",
  };
}

export default async function UserPage({ params: { username } }: Userprops) {
  const user = await getUser(username);
  return (
    <div>
      <Alert>
        This page uses generateMetadata to set the page title dynamically from
        the API response
      </Alert>
      <h1>{user.username}</h1>
      <p>First Name :- {user.first_name}</p>
      <p>Last Name :- {user.last_name}</p>
      <a href={"https://unsplash.com/" + user.username}>Unsplash Profile</a>
    </div>
  );
}
