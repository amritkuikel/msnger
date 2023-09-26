'use client'
import axios,{AxiosError} from 'axios';
import React, { useEffect } from 'react';


export default  function Home() {
    useEffect( () => {
        let params = new URLSearchParams(document.location.search);
        let a = params.get("a");
       async function axiosGet() {
        try {
          const data = await axios.post("/api/auth/mailverify",{"value":a} );
          alert(JSON.stringify(data.data.message));
        } catch (e) {
          const error = e as AxiosError;
          alert(error.message);
        }
       }
       axiosGet();
      
      }, []);
      

  return (
    <>
      <div>mail verification page</div>
    </>
  );
}
