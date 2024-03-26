import { Metadata } from 'next';
import React from 'react'
import SearchPage from './SearchPage';

export const metadata: Metadata = {
    title: "Search Page-CSR",
  };
  

export default function Page() {
  return (
    <SearchPage/>
  )
}
