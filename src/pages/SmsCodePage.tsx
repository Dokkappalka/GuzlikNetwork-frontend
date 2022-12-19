import { FormikProps, withFormik } from 'formik'
import React, { useContext, useEffect } from 'react'
import { Context } from '..'
import * as Yup from 'yup'
import { observer } from 'mobx-react-lite'
import { Navigate } from 'react-router-dom'

interface SmsCodeFormValues {
  smsCode: string
}

interface SmsCodeFormProps {
  initialSmsCode?: string
}

const SmsCodeForm = (props: FormikProps<SmsCodeFormValues>) => {
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
      <div className='flex justify-center pt-10 mx-auto h-screen'>
        <div className='relative w-[560px] mt-20'>
          <h1 className='flex justify-center text-xl font-semibold mb-10'>
            Enter your SMS code
          </h1>
          <input
            name='smsCode'
            type='text'
            className='border py-2 px-4 w-full h-[42px] mb-2'
            placeholder='Enter your SMS code...'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.smsCode}
          />
          {errors.smsCode && touched.smsCode && (
            <div className='text-red-500'>{errors.smsCode}</div>
          )}
          <div className=' flex justify-center mb-10 text-red-500'>
            {status}
          </div>
          <div className='flex justify-center mb-10'>
            <button
              type='submit'
              disabled={isSubmitting || !!(errors.smsCode && touched.smsCode)}
              className='py-2 px-5 mt-10 text-white bg-gray-400 rounded transition-all hover:bg-blue-700 duration-500 cursor-pointer'
            >
              Send code
            </button>
          </div>
          <span className='flex justify-center'>Didn't receive SMS?</span>
          <div className='flex justify-center mb-10 mt-5'>
            <button
              type='button'
              className='ml-2 py-1 px-3 bg-gray-100 rounded transition-all hover:bg-blue-100 duration-500 cursor-pointer'
              onClick={() => {
                alert(`To: ${store.user.phone}, SMS: ${store.user.smsCode}`)
              }}
            >
              Send again
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

const ContextSmsCodePage = () => {
  const { store } = useContext(Context)
  useEffect(() => {
    if (store.user.phone && store.user.smsCode) {
      alert(`To: ${store.user.phone}, SMS: ${store.user.smsCode}`)
    }
  }, [store.user.smsCode])
  const SmsCodePage = withFormik<SmsCodeFormProps, SmsCodeFormValues>({
    mapPropsToValues: (props) => ({
      smsCode: props.initialSmsCode || '',
    }),
    validationSchema: Yup.object().shape({
      smsCode: Yup.string()
        .required('Please, enter your SMS code')
        .min(6, 'Code must contain 6 characters')
        .max(6, 'Code must contain 6 characters'),
    }),
    handleSubmit(
      { smsCode }: SmsCodeFormValues,
      { props, setSubmitting, setErrors, setStatus }
    ) {
      console.log(smsCode)
      store.activate(smsCode, setStatus)
      setSubmitting(false)
    },
  })(SmsCodeForm)
  if (store.isAuth && store.user.isActivated) {
    return <Navigate to='/profile' />
  }
  if (!store.isAuth) {
    return <Navigate to='/login' />
  }
  return <SmsCodePage />
}

export default observer(ContextSmsCodePage)
