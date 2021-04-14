import React from 'react'
import Fuse from 'fuse.js'

import type { CardInfo } from './CardSelector'

interface Props {
  selected: Fuse.FuseResult<CardInfo>[]
  goBack: () => void
}

const DoneScreen: React.FC<Props> = ({ selected, goBack }) => (
  <div className="container max-w-screen-sm mx-auto w-full">
    <h1 className="text-center text-6xl font-bold mb-6">Copy that.</h1>
    We copied the following cards to your clipboard. Now just close this tab, go
    back to our form, and paste in your card list.
    <br />
    <br />
    <span className="my-2 text-sm">
      To be sure, we&apos;ve got the following cards:
    </span>
    <ul className="w-auto h-64 my-1 overflow-y-scroll border-gray-200 border-dashed border-2 rounded-xl cursor-default">
      {selected.map(c => (
        <li key={c.item.name} className="flex items-center space-x-2 px-3 py-2">
          <img src={c.item.image} alt={c.item.name} className="w-12" />
          <span className="text-lg">{c.item.name}</span>
        </li>
      ))}
    </ul>
    <span className="text-sm">
      Doesn&apos;t look right?{' '}
      <a onClick={goBack} className="underline cursor-pointer">
        Click here to go back and change it
      </a>
      .
    </span>
  </div>
)

export default DoneScreen
