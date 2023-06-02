import { ItemContext } from '../context/ItemContext'
import { useContext } from 'react'

// смысл?
export const useItemContext = () => {
  const context = useContext(ItemContext)

  if (!context) {
    throw Error('useItemContext must be used inside an ItemContextProvider')
  }

  return context
}
