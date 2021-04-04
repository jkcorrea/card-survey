import React from 'react'

interface Props {
  title: string
  link: string
}

const Card: React.FC<Props> = ({ title, children, link }) => (
  <a
    href={link}
    className="m-4 p-6 text-left border border-gray-200 rounded-xl no-underline transition-colors hover:text-blue-500 hover:border-blue-500 focus:text-blue-500 focus:border-blue-500"
    style={{
      flexBasis: '45%',
    }}
  >
    <h3 className="m-0 mb-4 text-2xl">{title} &rarr;</h3>
    <p className="m-0 text-xl leading-6">{children}</p>
  </a>
)

export default Card
