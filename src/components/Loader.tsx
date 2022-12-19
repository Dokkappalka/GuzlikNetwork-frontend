import React, { useContext } from 'react'
import { Context } from '..'
import preloader from '../assets/images/preloader.svg'

const Loader = () => {
  const { store } = useContext(Context)
  return (
    <div
      className={
        store.isAuth && store.user.isActivated
          ? 'h-screen ml-[240px] flex justify-center'
          : 'h-screen flex justify-center'
      }
    >
      <img src={preloader} alt='Loading...' className='w-[320px] h-[320px]' />
    </div>
  )
}

export default Loader
