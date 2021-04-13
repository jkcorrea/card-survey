import React from 'react'
import Fuse from 'fuse.js'

import type { CardInfo } from './CardSelector'

interface Props {
  selected: Fuse.FuseResult<CardInfo>[]
  goBack: () => void
}

const DoneScreen: React.FC<Props> = ({ selected, goBack }) => (
  <div className="container max-w-screen-md mx-auto w-full">
    Cool. We got your card list. Now just go back to the previous tab and paste
    in your results.
    <br />
    <br />
    Just to be sure, we&apos;ve got the following cards:
    <br />
    <br />
    <ul className="w-auto h-64 overflow-y-scroll border-gray-200 border-dashed border-2 rounded-xl cursor-default">
      {selected.map(c => (
        <li className="flex items-center space-x-2 px-3 py-2">
          <img src={c.item.image} alt={c.item.name} className="w-12" />
          <span className="text-lg">{c.item.name}</span>
        </li>
      ))}
    </ul>
    <br />
    Doesn&apos;t look right?{' '}
    <a onClick={goBack} className="underline cursor-pointer">
      Click here to go back and change it
    </a>
    .
  </div>
)

export default DoneScreen
