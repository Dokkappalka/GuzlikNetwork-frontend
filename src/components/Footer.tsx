import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  const linkClasses = 'font-semibold pb-1 lg:pb-0'
  return (
    <div className='flex justify-between lg:px-5 px-1 pt-10 shadow-md bg-gray-400 text-white mt-2 pb-10 text-xs lg:text-base'>
      <span>
        <p className={linkClasses}>Правила</p>
        <Link to='/privacy' className='underline'>
          Пользовательское соглашение
        </Link>
      </span>
      <span>
        <p className={linkClasses}>О нас</p>
        <Link to='/about' className='underline'>
          О проекте
        </Link>
      </span>
      <span>
        <p className={linkClasses}>Законы и документы</p>
        <Link to='/docs' className='underline'>
          Законы
        </Link>
      </span>
    </div>
  )
}

export default Footer
