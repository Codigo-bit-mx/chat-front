import React from 'react';
import DocumentHead from 'next/head';
import styled from 'styled-components';


const ContenedorPrincipal = styled.div`
   width: 100%;
  //  height: 100%;
   background-color: #000; 
`;


const Layout = ({children}) => {

    return ( 
        <>
        <html>

        <DocumentHead>
            <title> ChatBIT !! </title>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            {/* <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet" /> */}
            {/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css" integrity="sha512-oHDEc8Xed4hiW6CxD7qjbnI+B07vDdX7hEPTvn9pSZO1bcRqHp8mj9pyr+8RVC2GmtEfI2Bi9Ke9Ass0as+zpg==" crossOrigin="anonymous" referrerPolicy="no-referrer" />" */}
        </DocumentHead>

        
        <ContenedorPrincipal>
        <main>
          {children}
        </main>
        </ContenedorPrincipal>
        
        </html>
     </>
     );
}
 
export default Layout;

