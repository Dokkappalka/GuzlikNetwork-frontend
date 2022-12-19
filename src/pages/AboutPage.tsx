import React, { useContext } from 'react'
import { Context } from '..'

const AboutPage = () => {
  const { store } = useContext(Context)
  return (
    <div
      className={
        store.isAuth && store.user.isActivated
          ? 'h-screen lg:ml-[240px] ml-[110px]'
          : 'h-screen ml-3'
      }
    >
      <h1 className='text-center mt-5 font-bold text-2xl'>
        О "Guzlik Network"
      </h1>
      <div className='my-5 text-center xl:text-xl font-semibold'>
        Данный проект был создан командой юных специалистов во время
        студенческой практики и для нее. Однако он имеет большой потенциал к
        росту и масштабированию.
      </div>
      <div className='my-5 text-center xl:text-xl font-semibold'>
        Наша миссия — дать каждому возможность высказаться и показать им мир.
      </div>
      <div className='my-5 text-center xl:text-xl font-semibold'>
        Наши цели - создать бренд которому можно доверить все.
      </div>
      <div className='my-5 text-center xl:text-xl font-semibold'>
        Мы верим, что каждый заслуживает права голоса, и что мир становится
        лучше, когда мы слушаем, делимся и создаем сообщество через нашу сеть.
      </div>
    </div>
  )
}

export default AboutPage
