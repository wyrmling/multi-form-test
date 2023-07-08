// форматирование!
import { createContext, useReducer } from 'react'

export const ItemContext = createContext()

export const itemsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ITEM':
      return {
        items: action.payload
      }
    case 'CREATE_ITEM':
      return {
        items: [action.payload, ...state.items]
      }
    case 'UPDATE_ITEM':
        return {
          items: state.items.filter((i) => i._id !== action.payload._id)
        }
    case 'DELETE_ITEM':
      return {
        items: state.items.filter((i) => i._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const ItemContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(itemsReducer, {
    items: null
  })

  return (
    <ItemContext.Provider value={{...state, dispatch}}>
      { children }
    </ItemContext.Provider>
  )
}
