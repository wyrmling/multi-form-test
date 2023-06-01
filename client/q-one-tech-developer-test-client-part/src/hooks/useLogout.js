import { useAuthContext } from './useAuthContext'
import { useItemContext } from './useItemContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: dispatchItem } = useItemContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    dispatchItem({ type: 'SET_ITEM', payload: null })
    window.location.reload();
  }

  return { logout }
}