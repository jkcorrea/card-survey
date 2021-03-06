import React from 'react'
import Head from 'next/head'

import CardSelector from 'src/components/CardSelector'

const Home: React.FC = () => (
  <div className="h-screen py-2 px-4 flex flex-col justify-center items-center overflow-y-scroll">
    <Head>
      <title>Lettuce - Card Picker</title>
      <link
        rel="icon"
        href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🥬</text></svg>"
      />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,400;0,700;0,900;1,100;1,400;1,700;1,900&display=swap"
        rel="stylesheet"
      />
    </Head>

    <main className="container flex flex-col flex-1 justify-center items-center">
      <CardSelector />
    </main>
  </div>
)

export default Home
