import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Context } from '..'
import Modal from '../components/Modal'
import Tariff from '../components/Tariff'

const tarrifs = [
  {
    title: 'Standart',
    speed: 50,
    description:
      'Стандартный тариф. Подходит для социальных сетей, просмотра видео и не только. Не рекомендуется для скачивания объемных файлов.',
    price: 100,
    color: 'gray',
  },
  {
    title: 'VIP',
    speed: 1000,
    description:
      'Оптимальный тариф. Высокая скорость интернета и небольшая цена. Рекомендуем!',
    price: 200,
    color: 'orange',
  },
  {
    title: 'Premium',
    speed: 1050,
    description:
      'Молниеносная скорость интернета, которой хватит для любых целей!',
    price: 300,
    color: 'green',
  },
]

const TarrifsPage = () => {
  const [balanceError, setBalanceError] = useState('')
  const [modalActive, setModalActive] = useState(false)
  const [loading, setLoading] = useState(false)
  const { store } = useContext(Context)
  const [choosenTarrif, setChoosenTarrif] = useState({
    tariff: store.user.tariff,
    price: 0,
  })
  useEffect(() => {
    setBalanceError('')
  }, [modalActive])

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
                  setBalanceError('Недостаточно средств!')
                }
              } catch (error) {
                console.log(error)
                return <>Error</>
              } finally {
                setLoading(false)
              }
            }}
            className='ml-2 py-2 px-10 bg-blue-300 rounded transition-all hover:bg-blue-500 duration-500 cursor-pointer'
          >
            {loading ? 'Идёт покупка...' : 'Купить'}
          </button>
        </div>
        <div className='text-red-500'>{balanceError}</div>
      </Modal>
      {tarrifs.map((tariff) => {
        return (
          <Tariff
            tariffInfo={tariff}
            setTariff={setChoosenTarrif}
            setModal={setModalActive}
          />
        )
      })}
    </div>
  )
}

export default observer(TarrifsPage)
