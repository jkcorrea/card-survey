import React from 'react'
import Head from 'next/head'

import CardSelector from 'src/components/CardSelector'

const Home: React.FC = () => (
  <div className="h-screen py-2 px-0 flex flex-col justify-center items-center">
    <Head>
      <title>Points.wtf - Card Survey</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className="container px-20 py-0 flex flex-col flex-1 justify-center items-center">
      <CardSelector />
    </main>
  </div>
)

export default Home
