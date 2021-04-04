import React from 'react'
import Head from 'next/head'

import Card from 'src/components/Card'
import Code from 'src/components/Code'

const Home: React.FC = () => (
  <div className="h-screen py-2 px-0 flex flex-col justify-center items-center">
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className="px-20 py-0 flex flex-col flex-1 justify-center items-center">
      <h1 className="text-center m-0 leading-normal text-6xl">
        Welcome to{' '}
        <a
          href="https://nextjs.org"
          className="text-blue-500 no-underline hover:underline focus:underline"
        >
          Next.js!
        </a>
      </h1>

      <p className="text-center leading-relaxed text-2xl">
        Get started by editing <Code>pages/index.js</Code>
      </p>
      <div className="flex flex-col w-full max-w-screen-md justify-center items-center flex-wrap mt-12 sm:w-auto sm:flex-row">
        <Card link="https://nextjs.org/docs" title="Documentation">
          Find in-depth information about Next.js features and API.
        </Card>

        <Card link="https://nextjs.org/learn" title="Learn">
          Learn about Next.js in an interactive course with quizzes!
        </Card>

        <Card
          link="https://github.com/vercel/next.js/tree/master/examples"
          title="Examples"
        >
          Discover and deploy boilerplate example Next.js projects.
        </Card>

        <Card
          link="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          title="Deploy"
        >
          Instantly deploy your Next.js site to a public URL with Vercel.
        </Card>
      </div>
    </main>

    <footer className="w-full h-24 flex justify-center items-center border-t border-solid border-gray-100">
      <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
        className="flex justify-center items-center"
      >
        Powered by{' '}
        <img src="/vercel.svg" alt="Vercel Logo" className="ml-2 h-4" />
      </a>
    </footer>
  </div>
)

export default Home
