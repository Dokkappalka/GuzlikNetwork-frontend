import React from 'react'

interface TariffProps {
  tariffInfo: {
    title: string
    speed: number
    description: string
    price: number
    color: string
  }
  setTariff: (info: { tariff: string; price: number }) => void
  setModal: (condition: boolean) => void
}

const Tariff = ({ tariffInfo, setTariff, setModal }: TariffProps) => {
  return (
    <div
      className={
        'text-center mx-5 mb-4 rounded shadow-md xl:w-[30%] pb-3 ' +
        `bg-${tariffInfo.color}-50`
      }
    >
      <h1 className='font-bold text-xl mb-5'>{tariffInfo.title}</h1>

      <span className='mb-3 block'>Скорость: {tariffInfo.speed} Мб/с</span>
      <span className='text-center block h-[200px] px-3'>
        {tariffInfo.description}
      </span>
      <div className='flex justify-between w-auto px-3'>
        <span className='pt-2'>{tariffInfo.price} RUB</span>
        <button
          className='ml-2 py-2 px-10 bg-gray-200 rounded transition-all hover:bg-blue-100 duration-500 cursor-pointer'
          onClick={() => {
            setTariff({ tariff: tariffInfo.title, price: tariffInfo.price })
            setModal(true)
          }}
        >
          Купить
        </button>
      </div>
    </div>
  )
}

export default Tariff
