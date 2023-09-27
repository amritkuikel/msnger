'use client'
import axios,{AxiosError} from 'axios';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';


export default  function Home() {
  const router = useRouter()
    useEffect( () => {
        let params = new URLSearchParams(document.location.search);
        let a = params.get("a");
       async function axiosGet() {
        try {
          const data = await axios.post("/api/auth/mailverify",{"value":a} );
          alert(JSON.stringify(data.data.message));
          router.push('/login')

        } catch (e) {
          const error = e as AxiosError;
          alert(error.message);
        }
       }
       axiosGet();
      
      }, [router]);
      

  return (
    <>
      <div>mail verification page</div>
    </>
  );
}
