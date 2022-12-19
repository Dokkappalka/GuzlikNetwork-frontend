import React from 'react'
import classes from './Modal.module.css'

interface PropsTypes {
  active: boolean
  setActive: (bol: boolean) => void
  children: React.ReactNode
}

const Modal = ({ active, setActive, children }: PropsTypes) => {
  return (
    <div
      className={active ? `${classes.modal} ${classes.active}` : classes.modal}
      onClick={() => {
        setActive(false)
      }}
    >
      <div
        className={
          active
            ? `${classes.modal__content} ${classes.active}`
            : classes.modal__content
        }
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

export default Modal
