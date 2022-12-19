import { FormikProps, withFormik } from 'formik'
import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Context } from '..'
import * as Yup from 'yup'
import { Navigate } from 'react-router-dom'

interface BalanceFormValues {
  balance: number
}

interface BalanceFormProps {
  initialBalance?: number
}

const BalanceForm = (props: FormikProps<BalanceFormValues>) => {
  const { store } = useContext(Context)
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    status,
  } = props
  return (
    <form onSubmit={handleSubmit}>
      <div className='md:ml-[240px] ml-[120px] h-screen'>
        <h1 className='text-xl font-bold mt-5'>
          Текущий баланс: {store.user.balance}
        </h1>
        <div className='flex justify-between items-center'>
          <input
            name='balance'
            type='number'
            className='mt-5 border py-2 px-4 w-[124px] h-[42px] mr-5'
            placeholder='Укажите сумму...'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.balance}
          />
        </div>
        <button
          type='submit'
          disabled={isSubmitting || !!(errors.balance && touched.balance)}
          className='mt-5 py-2 px-5 text-white bg-gray-400 rounded transition-all hover:bg-blue-700 duration-500 cursor-pointer'
        >
          Пополнить
        </button>
        {errors.balance && touched.balance && (
          <div className='text-red-500'>{errors.balance}</div>
        )}
        <div className='text-red-500'>{status}</div>
      </div>
    </form>
  )
}
const ContextBalancePage = () => {
  const { store } = useContext(Context)
  const BalancePage = withFormik<BalanceFormProps, BalanceFormValues>({
    mapPropsToValues: (props) => ({
      balance: props.initialBalance || 0,
    }),
    validationSchema: Yup.object().shape({
      balance: Yup.number()
        .required('Введите сумму для пополнения...')
        .min(1)
        .max(9999),
    }),
    async handleSubmit(
      { balance }: BalanceFormValues,
      { props, setSubmitting, setErrors, setStatus }
    ) {
      console.log(balance)
      await store.updateBalance(store.user.balance + balance, setStatus)
      setSubmitting(false)
    },
  })(BalanceForm)
  if (!store.isAuth) {
    return <Navigate to='/login' />
  }
  if (store.isAuth && !store.user.isActivated) {
    return <Navigate to='/smsCode' />
  }
  return <BalancePage />
}
export default observer(ContextBalancePage)
