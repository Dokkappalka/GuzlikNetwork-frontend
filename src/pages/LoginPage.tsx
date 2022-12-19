import React, { useContext } from 'react'
import { Link, Navigate } from 'react-router-dom'
import * as Yup from 'yup'
import { withFormik, FormikProps } from 'formik'
import { Context } from '..'
import { observer } from 'mobx-react-lite'
import Loader from '../components/Loader'

interface LoginFormValues {
  phone: string
  password: string
}

interface LoginFormProps {
  initialPhone?: string
  initialPassword?: string
}

const LoginForm = (props: FormikProps<LoginFormValues>) => {
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
            Добро пожаловать. Пожалуйста, авторизуйтесь...
          </h1>
          <input
            name='phone'
            type='tel'
            className='border py-2 px-4 w-full h-[42px] mb-2'
            placeholder='Номер телефона...'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.phone.trim()}
          />
          {errors.phone && touched.phone && (
            <div className='text-red-500'>{errors.phone}</div>
          )}
          <input
            name='password'
            type='password'
            className='border py-2 px-4 w-full h-[42px] mb-2'
            placeholder='Пароль...'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password.trim()}
          />
          {errors.password && touched.password && (
            <div className='text-red-500'>{errors.password}</div>
          )}
          <div className=' flex justify-center mb-10 text-red-500'>
            {status}
          </div>
          <div className='flex justify-center mb-2'>
            <button
              type='submit'
              disabled={
                isSubmitting ||
                !!(errors.phone && touched.phone) ||
                !!(errors.password && touched.password)
              }
              className='py-2 px-5 mt-10 text-white bg-gray-400 rounded transition-all hover:bg-blue-700 duration-500 cursor-pointer'
            >
              Войти
            </button>
          </div>

          <span className='flex justify-center'>
            Нету аккаунта?
            <Link className='pl-2 text-blue-500 underline' to='/registration'>
              Зарегистрируйтесь!
            </Link>
          </span>
        </div>
      </div>
    </form>
  )
}

const ContextLoginPage = () => {
  const { store } = useContext(Context)
  const LoginPage = withFormik<LoginFormProps, LoginFormValues>({
    mapPropsToValues: (props) => ({
      phone: props.initialPhone || '',
      password: props.initialPassword || '',
    }),
    validationSchema: Yup.object().shape({
      phone: Yup.string()
        .required('Пожалуйста, введите номер телефона!')
        .matches(
          /^[0123456789+ ]*$/,
          'Пожалуйста, укажите верный номер телефона!'
        )
        .min(11, 'Пожалуйста, укажите верный номер телефона!')
        .max(12, 'Пожалуйста, укажите верный номер телефона!'),
      password: Yup.string()
        .required('Пожалуйста, введите пароль!')
        .min(6, 'Минимальная длинна пароля - 6 символов!')
        .max(32, 'Максмимальная длинна пароля - 32 символа!'),
    }),
    handleSubmit(
      { phone, password }: LoginFormValues,
      { props, setSubmitting, setErrors, setStatus }
    ) {
      console.log(phone, password)
      store.login(phone, password, setStatus)
      setSubmitting(false)
    },
  })(LoginForm)
  if (store.isAuth && store.user.isActivated) {
    return <Navigate to='/profile' />
  }
  if (store.isAuth && !store.user.isActivated) {
    return <Navigate to='/smsCode' />
  }
  return <LoginPage />
}

export default observer(ContextLoginPage)
