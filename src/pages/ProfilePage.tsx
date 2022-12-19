import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { Context } from '..'
import Navigation from '../components/Navigation'

const ProfilePage = () => {
  const { store } = useContext(Context)
  console.log(store.tariffDate)
  if (!store.isAuth) {
    return <Navigate to='/login' />
  }
  if (store.isAuth && !store.user.isActivated) {
    return <Navigate to='/smsCode' />
  }
  return (
    <div className='xl:ml-[240px] ml-[100px] h-screen w-screen flex justify-center'>
      <div className='p-5 mt-3 text-center xl:w-[50%] w-[100%]'>
        <h1 className='font-bold text-xl mt-5  mb-2 p-2 bg-blue-50 rounded-[25px]'>
          Текущий аккаунт: {store.user.phone}
        </h1>
        <h1 className='text-xl p-2 mb-2 bg-blue-50 rounded-[25px]'>
          Тариф:{' '}
          {store.user.tariff === 'none' ? 'отсутствует' : store.user.tariff}
        </h1>
        <h1 className='text-xl p-2 mb-2 bg-blue-50 rounded-[25px]'>
          Баланс: {store.user.balance} RUB
        </h1>
        {store.user.tariff !== 'none' && (
          <h1 className='text-xl p-2 bg-blue-50 rounded-[25px]'>
            Дата окончания тарифа: {localStorage.getItem('tariffDate')}
          </h1>
        )}
      </div>
    </div>
  )
}

export default observer(ProfilePage)
