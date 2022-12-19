import React, { useContext } from 'react'
import { Context } from '..'

const DocsPage = () => {
  const { store } = useContext(Context)
  const docsClasses =
    'lg:mx-[60px] lg:px-[60px] px-[10px] mr-2 py-3 mt-3 bg-gray-50 rounded shadow-md border'
  return (
    <div
      className={
        store.isAuth && store.user.isActivated
          ? 'h-max lg:ml-[240px] ml-[110px]'
          : 'h-max ml-3'
      } //Возможно, это можно реализовать лучше
    >
      <div className='my-5 text-center xl:text-xl font-semibold'>
        Законы и правовые документы.
      </div>
      <div className={docsClasses}>
        <ol>
          <li className='font-bold pb-2'>
            1. Федеральный закон "Об информации, информационных технологиях и о
            защите информации" от 27.07.2006 N 149-ФЗ
          </li>
        </ol>
      </div>
      <div className={docsClasses}>
        <ol>
          <li className='font-bold pb-2'>
            2. Федеральный закон "О защите детей от информации, причиняющей вред
            их здоровью и развитию" от 29.12.2010 N 436-ФЗ
          </li>
        </ol>
      </div>
      <div className={docsClasses}>
        <ol>
          <li className='font-bold pb-2'>
            3. Федеральный закон "О персональных данных" от 27.07.2006 N 152-ФЗ
          </li>
        </ol>
      </div>
      <div className={docsClasses}>
        <ol>
          <li className='font-bold pb-2'>
            4. Федеральный закон "О связи" от 07.07.2003 N 126-ФЗ
          </li>
        </ol>
      </div>
      <div className={docsClasses}>
        <ol>
          <li className='font-bold pb-2'>
            5. Федеральный закон "О внесении изменений в Федеральный закон "Об
            информации, информационных технологиях и о защите информации" и
            отдельные законодательные акты Российской Федерации по вопросам
            упорядочения обмена информацией с использованием
            информационно-телекоммуникационных сетей" от 05.05.2014 N 97-ФЗ
          </li>
        </ol>
      </div>
      <div className={docsClasses}>
        <ol>
          <li className='font-bold pb-2'>
            6. Федеральный закон "О внесении изменений в Федеральный закон "О
            связи" и Федеральный закон "О навигационной деятельности" от
            02.04.2014 N 60-ФЗ
          </li>
        </ol>
      </div>
      <div className={docsClasses}>
        <ol>
          <li className='font-bold pb-2'>
            7. Федеральный закон "О внесении изменений в отдельные
            законодательные акты Российской Федерации в части уточнения порядка
            обработки персональных данных в информационно-телекоммуникационных
            сетях" от 21.07.2014 N 242-ФЗ
          </li>
        </ol>
      </div>
      <div className={docsClasses}>
        <ol>
          <li className='font-bold pb-2'>
            8. Федеральный закон "О внесении изменений в Федеральный закон "О
            рекламе" от 02.07.2021 N 347-ФЗ
          </li>
        </ol>
      </div>
      <div className={docsClasses}>
        <ol>
          <li className='font-bold pb-2'>
            9. Федеральный закон "О внесении изменений в статью 27 Федерального
            закона "О рекламе" от 28.06.2022 N 232-ФЗ
          </li>
        </ol>
      </div>
      <div className={docsClasses}>
        <ol>
          <li className='font-bold pb-2'>
            10. Федеральный закон "О внесении изменений в отдельные
            законодательные акты Российской Федерации и о приостановлении
            действия отдельных положений законодательных актов Российской
            Федерации" от 14.07.2022 N 326-ФЗ
          </li>
        </ol>
      </div>
      <div className={docsClasses}>
        <ol>
          <li className='font-bold pb-2'>
            11. Федеральный закон "О внесении изменения в статью 25 Федерального
            закона "О рекламе" от 28.05.2022 N 150-ФЗ
          </li>
        </ol>
      </div>
      <div className={docsClasses}>
        <ol>
          <li className='font-bold pb-2'>
            12. Гражданский кодекс Российской Федерации часть 2 статья 469
          </li>
        </ol>
      </div>
      <div className={docsClasses}>
        <ol>
          <li className='font-bold pb-2'>
            13. Постановление Правительства Российской Федерации от 31.07.2014 №
            758 "О внесении изменений в некоторые акты Правительства Российской
            Федерации в связи с принятием Федерального закона "О внесении
            изменений в Федеральный закон "Об информации, информационных
            технологиях и о защите информации"
          </li>
        </ol>
      </div>
      <div className={docsClasses}>
        <ol>
          <li className='font-bold pb-2'>
            14. Постановление Правительства Российской Федерации от 12.08.2014 №
            801 "О внесении изменений в некоторые акты Правительства Российской
            Федерации"
          </li>
        </ol>
      </div>
      <div className={docsClasses}>
        <ol>
          <li className='font-bold pb-2'>
            15. Приказ ФСТЭК России от 18.02.2013 N 21 (ред. от 14.05.2020) "Об
            утверждении Состава и содержания организационных и технических мер
            по обеспечению безопасности персональных данных при их обработке в
            информационных системах персональных данных"
          </li>
        </ol>
      </div>
    </div>
  )
}

export default DocsPage
