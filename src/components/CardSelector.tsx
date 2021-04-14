import React, { useEffect, useRef, useState } from 'react'
// import { createClient } from 'contentful'
import Fuse from 'fuse.js'

import CardList from './CardList'
import DoneScreen from './DoneScreen'
import Pill from './Pill'

import cards from '../cards.json'

// const contentfulClient = createClient({
//   space: 'op9x21i1hka0',
//   accessToken: 'Sm0k-6Zuoc7jJM3LOgY2sOc-KE5MKqO7FZY8Qh50730',
// })

export interface CardInfo {
  network: string
  name: string
  image: string
}

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
  const fuse = useRef<Fuse<CardInfo> | null>(
    new Fuse(cards, { includeScore: true, keys: ['name'] }),
  )

  // useEffect(() => {
  //   const getCards = async () => {
  //     const entries = await contentfulClient.getEntries({
  //       content_type: 'card',
  //     })

  //     const cards: CardInfo[] = entries.items.map(
  //       ({ fields: { name, image } }: any) => ({
  //         name,
  //         image: image.fields.file.url,
  //       }),
  //     )

  //     fuse.current = new Fuse(cards, { includeScore: true, keys: ['name'] })
  //   }

  //   getCards()
  // }, [])

  useEffect(() => {
    if (fuse.current && inputValue.length > 0) {
      setShowList(true)
      setFilteredCards(fuse.current.search(inputValue))
      return
    }
    setShowList(false)
  }, [inputValue])

  const selectCard = (card: Fuse.FuseResult<CardInfo>) => {
    setSelectedCards([...selectedCards, card])
    setInputValue('')
    searchInputRef.current?.focus()
  }

  const unselectCard = (index: number) => {
    setSelectedCards([
      ...selectedCards.slice(0, index),
      ...selectedCards.slice(index + 1, selectedCards.length),
    ])
  }

  const copyToClipboard = () => {
    const input = document.createElement('input')
    document.body.append(input)
    input.value = selectedCards.map(c => c.item.name).join(', ')
    input.select()
    document.execCommand('copy')
    input.remove()
    setIsCopied(true)
  }

  if (isCopied)
    return (
      <DoneScreen
        selected={selectedCards}
        goBack={() => {
          setIsCopied(false)
        }}
      />
    )

  return (
    <form className="container max-w-screen-md px-4 mx-auto w-full">
      <h3 className="text-sm font-bold leading-loose">
        When you&apos;re finished, click copy below then go back &amp; paste
        what&apos;s in your clipboard back into the form :)
      </h3>

      <div className="relative">
        <div
          className="relative flex h-auto w-full my-1 items-center bg-white border-2 border-gray-300 rounded-lg p-2 flex-wrap overflow-x-scroll cursor-text focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-rose-400"
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
          className={`inline-flex items-center mt-1 px-6 py-3 border border-transparent text-base font-bold rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 text-white transform transition ${
            isCopied
              ? 'bg-green-500 focus:ring-green-500'
              : 'bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 hover:from-rose-400 hover:via-fuchsia-500 hover:to-indigo-500 focus:ring-rose-400 hover:-translate-y-px hover:shadow-xl'
          }`}
          onClick={copyToClipboard}
        >
          {isCopied
            ? 'Copied! Please return to the survey :)'
            : 'Done. Copy me!'}
        </button>
      </div>
    </form>
  )
}

export default CardSelector
