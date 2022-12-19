import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '..'

const Header = () => {
  const { store } = useContext(Context)
  return (
    <nav className='flex justify-between items-center h-[50px] px-5 shadow-md bg-gray-500 text-white'>
      <h3 className='font-bold'>Guzlik Network</h3>
      {!store.isAuth ? (
        <span>
          <Link to='/login' className='mr-5'>
            Вход
          </Link>
          <Link to='/registration'>Регистрация</Link>
        </span>
      ) : (
        <>
          <p className='mr-5'>Здравствуйте, {store.user.phone}</p>
          <div>
            <span className='mr-3'>{store.user.balance} RUB</span>
            <button
              className='bg-gray-400 rounded px-2 hover:bg-gray-300 duration-300 cursor-pointer'
              onClick={() => {
                store.logout()
              }}
            >
              Выход
            </button>
          </div>
        </>
      )}
    </nav>
  )
}

export default observer(Header)

//OK
