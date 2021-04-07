import React from 'react'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type Fuse from 'fuse.js'

import type { CardInfo } from './CardSelector'

interface Props {
  card: Fuse.FuseResult<CardInfo>
  onDelete: () => void
}

const Pill: React.FC<Props> = ({ card, onDelete }) => (
  <span className="mx-1 my-1 py-2 px-4 inline-flex justify-between items-center rounded-full whitespace-nowrap bg-purple-500 text-white cursor-default">
    {card.item.name}
    <FontAwesomeIcon
      icon={faTimesCircle}
      className="ml-3 w-4 cursor-pointer"
      onClick={onDelete}
    />
  </span>
)

export default Pill
