import React, { useContext } from 'react'
import * as Yup from 'yup'
import { withFormik, FormikProps } from 'formik'
import { Link, Navigate } from 'react-router-dom'
import { Context } from '..'
import { observer } from 'mobx-react-lite'

interface RegistrationFormValues {
  phone: string
  password: string
  confirmPassword: string
  rulesAccept: boolean
}

interface RegistrationFormProps {
  initialPhone?: string
  initialPassword?: string
  initialConfirmPassword?: string
  initialRulesAccept?: boolean
}

const RegistrationForm = (props: FormikProps<RegistrationFormValues>) => {
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
            Регистрация нового пользователя
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
          <input
            name='confirmPassword'
            type='password'
            className='border py-2 px-4 w-full h-[42px] mb-2'
            placeholder='Повторите пароль...'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.confirmPassword.trim()}
          />
          {errors.confirmPassword && touched.confirmPassword && (
            <div className='text-red-500'>{errors.confirmPassword}</div>
          )}
          <span className='flex justify-center'>
            Я прочитал(а) и принимаю
            <Link to='/privacy' className='text-blue-500 underline mx-2'>
              пользовательское соглашение
            </Link>
            <input
              name='rulesAccept'
              type='checkbox'
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </span>
          {errors.rulesAccept && touched.rulesAccept && (
            <div className='text-red-500 flex justify-center'>
              {errors.rulesAccept}
            </div>
          )}
          <div className=' flex justify-center mb-10 mt-2 text-red-500'>
            {status}
          </div>
          <div className='flex justify-center mb-10'>
            <button
              type='submit'
              disabled={
                isSubmitting ||
                !!(errors.phone && touched.phone) ||
                !!(errors.password && touched.password) ||
                !!(errors.confirmPassword && touched.confirmPassword)
              }
              className='py-2 px-5 mt-10 text-white bg-gray-400 rounded transition-al hover:bg-blue-700 duration-500 cursor-pointer'
            >
              Отправить СМС
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
const ContextRegistrationPage = () => {
  const { store } = useContext(Context)
  const RegistrationPage = withFormik<
    RegistrationFormProps,
    RegistrationFormValues
  >({
    mapPropsToValues: (props) => ({
      phone: props.initialPhone || '',
      password: props.initialPassword || '',
      confirmPassword: props.initialConfirmPassword || '',
      rulesAccept: props.initialRulesAccept || false,
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
      confirmPassword: Yup.string().oneOf(
        [Yup.ref('password')],
        'Пароли не совпадают!'
      ),
      rulesAccept: Yup.bool().oneOf(
        [true],
        'Требуется принять пользовательское соглашение!'
      ),
    }),
    handleSubmit(
      { phone, password, confirmPassword, rulesAccept }: RegistrationFormValues,
      { props, setSubmitting, setErrors, setStatus }
    ) {
      console.log(phone, password, confirmPassword, rulesAccept)
      store.registration(phone, password, setStatus)
      setSubmitting(false)
    },
  })(RegistrationForm)
  if (store.isAuth && !store.user.isActivated) {
    return <Navigate to='/smsCode' />
  }
  if (store.isAuth && store.user.isActivated) {
    return <Navigate to='/profile' />
  }
  return <RegistrationPage />
}
export default observer(ContextRegistrationPage)
