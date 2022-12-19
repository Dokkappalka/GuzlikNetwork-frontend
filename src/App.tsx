import React, { Suspense, useContext, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import Footer from './components/Footer'
import { Context } from '.'
import { observer } from 'mobx-react-lite'
import ProfilePage from './pages/ProfilePage'
import Navigation from './components/Navigation'
import TarrifsPage from './pages/TarrifsPage'
import BalancePage from './pages/BalancePage'
import Loader from './components/Loader'
const ContextSmsCodePage = React.lazy(() => import('./pages/SmsCodePage'))
const PrivacyPage = React.lazy(() => import('./pages/PrivacyPage'))
const AboutPage = React.lazy(() => import('./pages/AboutPage'))
const RegistrationPage = React.lazy(() => import('./pages/RegistrationPage'))
const DocsPage = React.lazy(() => import('./pages/DocsPage'))

function App() {
  const { store } = useContext(Context)
  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [])

  return (
    <div>
      <div className='sticky bg-gray-500 top-0 left-0'>
        <Header />
      </div>
      <div className='flex justify-between'>
        {store.isAuth && store.user.isActivated && (
          <div className='fixed'>
            <Navigation />
          </div>
        )}
        {!store.isLoading && (
          <Routes>
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/tarrifs' element={<TarrifsPage />} />
            <Route path='balance' element={<BalancePage />} />
          </Routes>
        )}
      </div>
      <Suspense fallback={<Loader />}>
        {store.isLoading && <Loader />}
        <div className={store.isLoading ? 'hidden' : ''}>
          <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/registration' element={<RegistrationPage />} />

            <Route path='/smsCode' element={<ContextSmsCodePage />} />
            <Route path='/privacy' element={<PrivacyPage />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/docs' element={<DocsPage />} />
            <Route path='/' element={<Navigate to='/login' />} />
          </Routes>
        </div>
      </Suspense>

      <div className='relative bottom-0 left-0'>
        <Footer />
      </div>
    </div>
  )
}

export default observer(App)
