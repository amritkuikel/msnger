'use client'
import React, { useEffect } from 'react';
import User from "@/models/usermodel";


export default function Home() {
    useEffect(() => {
        let params = new URLSearchParams(document.location.search);
        let a = params.get("a");
        const isAvailable = User.findOne({token:a})
        console.log(isAvailable)
      }, []);
      

  return (
    <>
      <div>mail verification page</div>
    </>
  );
}
