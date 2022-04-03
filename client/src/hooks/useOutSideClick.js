import { useEffect, useRef, useState } from 'react'

const useOutSideClick = () => {
  const [isOpen, setIsOpen] = useState()
  const ref = useRef()

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside, true)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true)
    }
  }, [])

  return { ref, isOpen, setIsOpen }
}

export default useOutSideClick