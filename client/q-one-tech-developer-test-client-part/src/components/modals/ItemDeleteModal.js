// форматирование!
// неиспользуемые импорты
import React, { Component, useState } from 'react';
import { useItemContext } from '../../hooks/useItemContext'
import { useAuthContext } from '../../hooks/useAuthContext'

const ItemDeleteModal = ({modalDeleteId, closeDeleteModal, showDeleteModal}) => {
    const { dispatch } = useItemContext()
    const { user } = useAuthContext()
    // а смысл?)
    const _id = modalDeleteId

    const handleClick = async () => {
        if (!user) {
          return
        }
    
        const response = await fetch('/api/items/' + _id, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        })
        const json = await response.json()
    
        if (response.ok) {
          dispatch({type: 'DELETE_ITEM', payload: json})
        }
        closeDeleteModal()
      }

        return (
          // () не нужны
            <div className={(showDeleteModal ? "modal" : 'hidden')}>
                
                <div className={(showDeleteModal ? 'modal-delete-header' : 'hidden')}> 
                    <p className={(showDeleteModal ? 'wizzard-step-active-3' : 'hidden')}>Warning</p>
                </div>      
                <div className={(showDeleteModal ? 'modal-delete-content' : 'hidden')}>                  
                            <p className={(showDeleteModal ? "delete-warning" : 'hidden')}>Are you sure?</p>                        
                            <div className={(showDeleteModal ? "footer" : 'hidden')}>
                            <button onClick={closeDeleteModal} className={(showDeleteModal ? "reject-delete-button" : 'hidden')}>No, keep</button>
                            <button onClick={handleClick} className={(showDeleteModal ? "confirm-delete-button" : 'hidden')}>Yes, delete</button>
                            </div>
                </div>
            </div>
             
        ) 

  }
  
  export default ItemDeleteModal;
