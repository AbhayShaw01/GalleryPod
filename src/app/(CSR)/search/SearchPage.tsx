"use client";
import { UnsplashImg, UnsplashSearchResponse } from "@/models/unsplash-image";
import Image from "next/image";
import React, { FormEvent, useState } from "react";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import styles from "./SearchPage.module.css";


export default function SearchPage() {
  const [loading, setLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(false);
  const [searchResults, setSearchResults] = useState<UnsplashImg[] | null>(
    null
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const query = formData.get("query")?.toString().trim();

    if (query) {
      try {
        setSearchResults(null);
        setLoading(true);
        setLoadingError(false);

        const response = await fetch("/api/search?query="+query);
        const images: UnsplashImg[] = await response.json();

        setSearchResults(images);
      } catch (error) {
        console.error;
        setLoadingError(false);
      } finally {
        setLoading(false);
      }
    }
  }
  return (
    <div>
      <Alert>
      This page  fetches data <strong>client-side</strong>.To prevent Api credentials leak, the request is sent to NextJS route that runs on server. This route handler then fetches data from api and returns it to client.
      </Alert>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="search-input">
          <Form.Label>SearchInput</Form.Label>
          <Form.Control name="query" placeholder="Eg :- cats,dogs,..." />
        </Form.Group>
      </Form>
      <Button type="submit" className="mb-3" disabled={loading}>
        Search
      </Button>
      <div className="d-flex flex-column align-items-center">
        {loading && <Spinner animation="border" />}
        {loadingError && <p>Something went wrong!! Please try again.</p>}
        {searchResults?.length === 0 && (
          <p>Nothing found. Try different query</p>
        )}
      </div>
      {searchResults && (
        <>
          {searchResults.map((image) => (
            <Image
              src={image.urls.raw}
              width={200}
              height={200}
              alt={image.description}
              key={image.urls.raw}
              className={styles.image}
            />
          ))}
        </>
      )}
    </div>
  );
}
