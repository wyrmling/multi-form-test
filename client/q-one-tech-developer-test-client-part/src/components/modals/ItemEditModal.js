import React, { useState } from 'react';

import { useItemContext } from "../../hooks/useItemContext"
import { useAuthContext } from '../../hooks/useAuthContext'

const ItemEditModal = ({setItemsList, closeEditModal, showEditModal, modalEditId, modalEditName}) => {
    
    const [name, setName] = useState('')
    const [is_active, setIsActive] = useState(true)

    const { items, dispatch } = useItemContext()
    const { user } = useAuthContext()
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    const _id = modalEditId

    const handleSubmit = async (e) => {
        e.preventDefault()
    
        if (!user) {
          setError('You must be logged in')
          return
        }
    
        const item = {name, is_active}
  
        const response = await fetch('/api/items/' + _id, {
          method: 'PATCH',
          body: JSON.stringify(item),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          }
        })
        
        const json = await response.json()
        
        if (!response.ok) {
          setError(json.error)
          setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
          setName('')
          setIsActive('')
          setError(null)
          setEmptyFields([])
          // dispatch({type: 'DELETE_ITEM', payload: json})
          dispatch({type: 'CREATE_ITEM', payload: json})
          setItemsList([json, ...items])      
        }
        
        closeEditModal();
      }
        return (
            <div className={(showEditModal ? "modal" : 'hidden')}>
                <div className={(showEditModal ? 'modal-edit-header' : 'hidden')}> 
                    <p className={(showEditModal ? 'wizzard-step-active-3' : 'hidden')}>Edit item</p>
                </div>      
                <div className={(showEditModal ? 'modal-edit-content' : 'hidden')}>
                    
                            <div className={(showEditModal ? 'group-input-wrapper-1' : 'hidden')}>
                                <label className={(showEditModal ? 'lbl' : 'hidden')}>Enter Name</label>
                                <input 
                                // value={modalEditName}
                                type="text" 
                                name="username" 
                                placeholder={modalEditName}
                                onChange={(e) => setName(e.target.value)}
                                className={(showEditModal ? "input" : 'hidden')}/>
                            </div>
                            <div className={(showEditModal ? 'group-input-wrapper-2' : 'hidden')}>
                                <label className={(showEditModal ? 'lbl' : '')}>Select State</label>
                                {/* <input type="text" name="password" placeholder="Enter Password" className="input"/> */}
                                <select 
                                // value={modalEditIsActive} 
                                sname="state" 
                                onChange={(e) => setIsActive(e.target.value)}
                                className={(showEditModal ? "input" : 'hidden')}>
                                    <option value={true} className={(showEditModal ? "input" : 'hidden')}>Active</option>
                                    <option value={false} className={(showEditModal ? "input" : 'hidden')}>Not active</option>
                                </select>
                            </div>
                            
                            <div className={(showEditModal ? "footer" : 'hidden')}>
                            <button onClick={closeEditModal} className={(showEditModal ? "cancel-button" : 'hidden')}>Cancel</button>
                            <button onClick={handleSubmit} className={(showEditModal ? "next-step-button-modal" : 'hidden')}>Save</button>
                            </div>
                </div>
            </div>
             
        ) 

  }
  
  export default ItemEditModal;