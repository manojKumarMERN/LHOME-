import * as React from "react";

interface dataProps{
    url:string;  
    headers:any;
    method:string;  
    data:string;
}

interface returnValue{
    status:string;
    data:any;
    error:any;
}

{/* @ts-expect-error Server Component */}
const RestAPI: React.FC<dataProps> = (prps)  => {
   const {url,headers,method,data} = prps;
   async function getResponse(url:string,header:object,method:string,data:string) {
     try{
        let response = null;
        if (method.toUpperCase() === "GET"){
            const tquery = Object.keys(data).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}` ).join('&');
            const query = `?${tquery}`;
            const urlnew = `${url}${query}`;
            response = await fetch(urlnew,{headers:headers,method:method});
        }else{
            response = await fetch(url,{headers:headers,method:method,body:JSON.stringify(data)});
        }
        if (response.ok) {
            const data = await response.json(); 
            if (!data.error){
                const rvalue : returnValue = {
                    status:"success",
                    data:data,
                    error:null
                }
                return rvalue;  
            }else{
                const rvalue : returnValue = {
                    status:"success",
                    data:data,
                    error:data.error
                }                
                return rvalue;  
            }
        }else{
            const message = `An error has occured: ${response.status}`;
            const rvalue : returnValue = {
                status:"error",
                data:data,
                error:message
            }               
            return rvalue;
        }
     } catch(e:any){
        const rvalue : returnValue = {
            status:"error",
            data:[],
            error:e
        }            
        return rvalue; 
     }
  }
  return getResponse(url,headers,method,data); 
}

export default RestAPI;