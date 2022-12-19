import { observer } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Context } from '..'
import Modal from '../components/Modal'

const TarrifsPage = () => {
  const [modalActive, setModalActive] = useState(false)
  const [loading, setLoading] = useState(false)
  const { store } = useContext(Context)
  const [choosenTarrif, setChoosenTarrif] = useState({
    tariff: store.user.tariff,
    price: 0,
  })
  if (!store.isAuth) {
    return <Navigate to='/login' />
  }
  if (store.isAuth && !store.user.isActivated) {
    return <Navigate to='/smsCode' />
  }
  return (
    <div className='xl:flex md:ml-[200px] ml-[90px] min-h-screen h-full my-5 w-screen'>
      <Modal active={modalActive} setActive={setModalActive}>
        <span className='block'>
          Вы действительно хотите приобрести тарифф {choosenTarrif.tariff} за{' '}
          {choosenTarrif.price} RUB?
        </span>
        <span className='block'>Ваш текущий тарифф будет аннулирован.</span>
        <span className='block'>
          Ваш текущий тариф:{' '}
          {store.user.tariff === 'none' ? 'отсутствует' : store.user.tariff}
        </span>
        {store.user.tariff !== 'none' && (
          <span className='block'>
            Время окончания тарифа: {localStorage.getItem('tariffDate')}
          </span>
        )}
        <div className='flex justify-between mt-10'>
          <button
            onClick={() => {
              setModalActive(false)
            }}
            className='ml-2 py-2 px-10 bg-red-300 rounded transition-all hover:bg-red-500 duration-500 cursor-pointer'
          >
            Закрыть
          </button>
          <button
            disabled={loading}
            onClick={async () => {
              setLoading(true)
              try {
                if (store.user.balance >= choosenTarrif.price) {
                  await store.updateTariff(choosenTarrif.tariff)
                  setModalActive(false)
                } else {
                  setModalActive(false)
                }
              } catch (error) {
                console.log(error)
              } finally {
                setLoading(false)
              }
            }}
            className='ml-2 py-2 px-10 bg-blue-300 rounded transition-all hover:bg-blue-500 duration-500 cursor-pointer'
          >
            {loading ? 'Идёт покупка...' : 'Купить'}
          </button>
        </div>
      </Modal>
      <div className='text-center mx-5 mb-4 bg-gray-50 rounded shadow-md xl:w-[30%] pb-3 '>
        <h1 className='font-bold text-xl mb-5'>Standart</h1>

        <span className='mb-3 block'>Скорость: 50 Мб/с</span>
        <span className='text-center block h-[200px] px-3'>
          Стандартный тариф. Подходит для социальных сетей, просмотра видео и не
          только. Не рекомендуется для скачивания объемных файлов.
        </span>
        <div className='flex justify-between w-auto px-3'>
          <span className='pt-2'>100 RUB</span>
          <button
            className='ml-2 py-2 px-10 bg-gray-200 rounded transition-all hover:bg-blue-100 duration-500 cursor-pointer'
            onClick={() => {
              setChoosenTarrif({ tariff: 'Standart', price: 100 })
              setModalActive(true)
            }}
          >
            Купить
          </button>
        </div>
      </div>
      <div className='text-center mx-5 mb-4 bg-orange-50 rounded shadow-md xl:w-[30%] pb-3'>
        <h1 className='font-bold text-xl mb-5'>VIP</h1>
        <span className='mb-3 block'>Скорость: 1000 Мб/с</span>
        <span className='text-center block h-[200px] px-3'>
          Оптимальный тариф. Высокая скорость интернета и небольшая цена.
          Рекомендуем!
        </span>
        <div className='flex justify-between w-auto px-3'>
          <span className='pt-2'>200 RUB</span>
          <button
            onClick={() => {
              setChoosenTarrif({ tariff: 'VIP', price: 200 })
              setModalActive(true)
            }}
            className='ml-2 py-2 px-10 bg-gray-200 rounded transition-all hover:bg-blue-100 duration-500 cursor-pointer'
          >
            Купить
          </button>
        </div>
      </div>
      <div className='text-center mx-5 bg-green-50 rounded shadow-md xl:w-[30%] pb-3'>
        <h1 className='font-bold text-xl mb-5'>Premium</h1>
        <span className='mb-3 block'>Скорость: 1050 Мб/с</span>
        <span className='text-center block h-[200px] px-3'>
          Молниеносная скорость интернета, которой хватит для любых целей!
        </span>
        <div className='flex justify-between w-auto px-3'>
          <span className='pt-2'>300 RUB</span>
          <button
            onClick={() => {
              setChoosenTarrif({ tariff: 'Premium', price: 300 })
              setModalActive(true)
            }}
            className='ml-2 py-2 px-10 bg-gray-200 rounded transition-all hover:bg-blue-100 duration-500 cursor-pointer'
          >
            Купить
          </button>
        </div>
      </div>
    </div>
  )
}

export default observer(TarrifsPage)
