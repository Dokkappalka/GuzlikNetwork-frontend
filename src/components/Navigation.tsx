import React from 'react'
import { NavLink } from 'react-router-dom'

const Navigation = () => {
  return (
    <div className='sticky h-screen lg:w-[200px] w-[105px] bg-gray-200 lg:pl-10 pl-2 pt-[50%] lg:pt-5'>
      <NavLink
        to='/profile'
        className={(e) => {
          return e.isActive ? 'text-xl font-bold' : 'text-xl'
        }}
      >
        Профиль
      </NavLink>
      <br />
      <br />
      <NavLink
        to='/tarrifs'
        className={(e) => {
          return e.isActive ? 'text-xl font-bold' : 'text-xl'
        }}
      >
        Тарифы
      </NavLink>
      <br />
      <br />
      <NavLink
        to='/balance'
        className={(e) => {
          return e.isActive ? 'text-xl font-bold' : 'text-xl'
        }}
      >
        Баланс
      </NavLink>
    </div>
  )
}

export default Navigation

//Дизвйн навигации мог бы быть и лучше...
