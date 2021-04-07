import React, { useEffect, useRef, useState } from 'react'
import Fuse from 'fuse.js'

import CardList from './CardList'
import Pill from './Pill'

import _cards from '../cards.json'

export interface CardInfo {
  name: string
  image: string
}

const cards: CardInfo[] = _cards.map(c => ({
  name: c,
  image:
    'https://citicards.citi.com/usc/LPACA/Citi/Cards/DoubleCash/External_HT2/lib/doublecash_card_desktop@2x-kkzyptkf.webp',
}))

const fuse = new Fuse(cards, { includeScore: true, keys: ['name'] })

const CardSelector: React.FC = () => {
  const [showList, setShowList] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [filteredCards, setFilteredCards] = useState<
    Fuse.FuseResult<CardInfo>[]
  >()
  const [selectedCards, setSelectedCards] = useState<
    Fuse.FuseResult<CardInfo>[]
  >([])
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputValue.length > 0) {
      setShowList(true)
      setFilteredCards(fuse.search(inputValue))
      return
    }
    setShowList(false)
  }, [inputValue])

  const selectCard = (card: Fuse.FuseResult<CardInfo>) => {
    setSelectedCards([...selectedCards, card])
    setInputValue('')
    searchInputRef.current?.focus()
    setIsCopied(false)
  }

  const unselectCard = (index: number) => {
    setSelectedCards([
      ...selectedCards.slice(0, index),
      ...selectedCards.slice(index + 1, selectedCards.length),
    ])
    setIsCopied(false)
  }

  const copyToClipboard = () => {
    const input = document.createElement('input')
    document.body.append(input)
    input.value = selectedCards.map(c => c.item.name).join(',')
    input.select()
    document.execCommand('copy')
    input.remove()
    setIsCopied(true)
  }

  return (
    <form className="container max-w-screen-md mx-auto w-full">
      <h3 className="text-sm font-bold leading-loose">
        When you&apos;re finished, go back &amp; paste what&apos;s in your
        clipboard back into the form :)
      </h3>

      <div className="relative">
        <div
          className="relative flex h-auto w-full my-1 items-center bg-white border-2 border-gray-300 rounded-lg p-2 flex-wrap cursor-text focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-rose-400"
          style={{ minHeight: '3rem' }}
          onClick={e => {
            e.stopPropagation()
            searchInputRef.current?.focus()
          }}
        >
          {selectedCards.map((c, ix) => (
            <Pill
              key={c.item.name}
              card={c}
              onDelete={() => unselectCard(ix)}
            />
          ))}

          <input
            autoFocus
            tabIndex={0}
            ref={searchInputRef}
            type="text"
            placeholder={
              selectedCards.length > 0
                ? 'Type to select another card...'
                : 'Start typing to select your cards...'
            }
            autoComplete="off"
            className="flex-1 my-2 p-2 border-none bg-transparent outline-none"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
          />
        </div>

        {showList && (
          <CardList
            cards={filteredCards!}
            selectedCards={selectedCards}
            onSelect={selectCard}
          />
        )}
      </div>

      <div className="mt-2 text-right">
        <button
          tabIndex={0}
          type="button"
          className={`inline-flex items-center mt-1 px-6 py-3 border border-transparent text-base font-bold rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 text-white transform transition hover:-translate-y-px hover:shadow-xl ${
            isCopied
              ? 'bg-green-300 hover:bg-green-500 focus:ring-green-300'
              : 'bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 hover:from-rose-400 hover:via-fuchsia-500 hover:to-indigo-500 focus:ring-rose-400'
          }`}
          onClick={copyToClipboard}
        >
          {isCopied ? 'Copied!' : 'Done. Copy me!'}
        </button>
      </div>
    </form>
  )
}

export default CardSelector
