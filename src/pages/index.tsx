import React from 'react'
import Head from 'next/head'

import CardSelector from 'src/components/CardSelector'

const Home: React.FC = () => (
  <div className="h-screen py-2 px-0 flex flex-col justify-center items-center">
    <Head>
      <title>Points.wtf - Card Survey</title>
      <link rel="icon" href="/favicon.ico" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,400;0,700;0,900;1,100;1,400;1,700;1,900&display=swap"
        rel="stylesheet"
      />
    </Head>

    <main className="container px-20 py-0 flex flex-col flex-1 justify-center items-center">
      <CardSelector />
    </main>
  </div>
)

export default Home
