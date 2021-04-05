import React from 'react'
import type Fuse from 'fuse.js'

interface Props {
  cards: Fuse.FuseResult<string>[]
  selectedCards: Fuse.FuseResult<string>[]
  onSelect: (card: Fuse.FuseResult<string>) => void
}

const CardList: React.FC<Props> = ({ cards, selectedCards, onSelect }) => (
  <div className="absolute w-full bg-white rounded-sm mt-px z-10">
    <ul className="block p-0 m-0 border border-gray-100 max-h-80 overflow-y-scroll">
      {cards.map(c =>
        selectedCards.map(s => s.refIndex).includes(c.refIndex) ? null : (
          <a key={`${c.refIndex}-${c.item}`} onClick={() => onSelect(c)}>
            <li className="px-6 py-4 border-b border-gray-200 hover:bg-purple-500 hover:text-white cursor-pointer">
              {c.item}
            </li>
          </a>
        ),
      )}
    </ul>
  </div>
)

export default CardList
