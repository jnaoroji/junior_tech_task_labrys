"use client"
import React from 'react'
import { Inter } from 'next/font/google'
import './globals.css'
import { ChakraProvider } from '@chakra-ui/react';


const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} style={{background: "black", minHeight:"100vh", alignItems:"center"}}>
        <ChakraProvider>
        {children}
        </ChakraProvider>
        </body>
    </html>
  );
}
