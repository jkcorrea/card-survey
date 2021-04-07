import React from 'react'
import type Fuse from 'fuse.js'

import type { CardInfo } from './CardSelector'

interface Props {
  cards: Fuse.FuseResult<CardInfo>[]
  selectedCards: Fuse.FuseResult<CardInfo>[]
  onSelect: (card: Fuse.FuseResult<CardInfo>) => void
}

const CardList: React.FC<Props> = ({ cards, selectedCards, onSelect }) => (
  <div className="absolute w-full bg-white rounded-sm mt-px z-10">
    <ul className="block p-0 m-0 border border-gray-100 max-h-80 overflow-y-scroll">
      {cards.map(c =>
        selectedCards.map(s => s.refIndex).includes(c.refIndex) ? null : (
          <a key={`${c.refIndex}-${c.item.name}`} onClick={() => onSelect(c)}>
            <li className="flex items-center space-x-6 px-6 py-4 border-b border-gray-200 hover:bg-purple-500 hover:text-white cursor-pointer">
              <img src={c.item.image} alt={c.item.name} className="w-24" />
              <span className="text-lg">{c.item.name}</span>
            </li>
          </a>
        ),
      )}
    </ul>
  </div>
)

export default CardList
