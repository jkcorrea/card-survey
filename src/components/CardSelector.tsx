import React, { useEffect, useRef, useState } from 'react'
import Fuse from 'fuse.js'

import CardList from './CardList'
import Pill from './Pill'

import cards from '../cards.json'

const fuse = new Fuse(cards, { includeScore: true })

const CardSelector: React.FC = () => {
  const [showList, setShowList] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [filteredCards, setFilteredCards] = useState<
    Fuse.FuseResult<string>[]
  >()
  const [selectedCards, setSelectedCards] = useState<Fuse.FuseResult<string>[]>(
    [],
  )
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputValue.length > 0) {
      setShowList(true)
      setFilteredCards(fuse.search(inputValue))
      return
    }
    setShowList(false)
  }, [inputValue])

  const selectCard = (card: Fuse.FuseResult<string>) => {
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
    input.value = selectedCards.map(c => c.item).join(',')
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
          className="relative flex h-auto w-full items-center bg-white border-2 border-gray-300 rounded-lg p-2 flex-wrap cursor-text"
          style={{ minHeight: '3rem' }}
          onClick={e => {
            e.stopPropagation()
            searchInputRef.current?.focus()
          }}
        >
          {selectedCards.map((c, ix) => (
            <Pill key={c.item} card={c} onDelete={() => unselectCard(ix)} />
          ))}

          <input
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
          type="button"
          className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-bold rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 text-white ${
            isCopied
              ? 'bg-green-300 hover:bg-green-500 focus:ring-green-300'
              : 'bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500'
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
