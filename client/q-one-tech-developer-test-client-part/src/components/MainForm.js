import React, { useEffect, useState } from 'react';
import AuthForm from './AuthForm'
import ItemForm from './ItemForm'
import ItemPreviewForm from './ItemPreviewForm'
import ItemEditForm from './ItemEditForm'
import { useItemContext } from "../hooks/useItemContext"
import { useAuthContext } from "../hooks/useAuthContext"

const MainForm = () => {

  const {items, dispatch} = useItemContext()
  const {user} = useAuthContext()

  const [step, setStep] = useState(1) 
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [itemName, setItemName] = useState('')
  const [itemState, setItemState] = useState('')

  const [lastItemId, setLastItemId] = useState('')
  const [inputState, setInput] = useState('')

  const [showEditModal, setShowEditModal] = useState(false)
  const [modalEditId, setModalEditId] = useState('')
  const [modalEditName, setEditName] = useState('')
  const [modalEditIsActive, setEditIsActive] = useState(true)

  const [modalDeleteId, setModalDeleteId] = useState('')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)

    useEffect(() => {
    const fetchItem = async () => {
      const response = await fetch('/api/items', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
     
      const json = await response.json()
      
      if (response.ok) {
        dispatch({type: 'SET_ITEM', payload: json})
      }
    }

    if (user) {
        fetchItem()
    }
  }, [dispatch, user])

    const nextStep = () => {
        setStep(step + 1)
    };
  
    const prevStep = () => {
      setStep(step - 1)
    };

    const twoStepsBack = () => {
      setStep(step-2)
    }
  
    // Handle fields change
    const handleChange = input => e => {
        setInput({ [input]: e.target.value })
    //   this.setState({ [input]: e.target.value });
    };

    const openEditModal = (_id, name, is_active) => {
      setModalEditId(_id)
      setEditName(name)
      setEditIsActive(is_active)
      setShowEditModal(!showEditModal)
    }

    const closeEditModal = () => {
      setShowEditModal(!showEditModal)
    }
    

    const openDeleteModal = (_id) => {
      setModalDeleteId(_id)
      setShowDeleteModal(!showDeleteModal)
    }
    const closeDeleteModal = () => {
      setShowDeleteModal(!showDeleteModal)
    }

  console.log(step)
    // render() 
    //   const { step } = this.state;
    //   const { firstName, lastName, email, occupation, city, bio } = this.state;
    //   const values = { firstName, lastName, email, occupation, city, bio };
const values = {username, password, itemName, itemState, inputState}
    switch (step) {
        case 1:
        return (
          <AuthForm
            nextStep={nextStep}    
            handleChange={handleChange}
            username={username}
            password={password}
            setPassword={setPassword}
            setUsername={setUsername}
            step={step}
            error={error}
            isLoading={isLoading}
          >
            {/* <button onClick={nextStep(setStep,1)}></button> */}
          </AuthForm>
        );
        case 2:
        return(
            <ItemForm
            nextStep={nextStep}    
            handleChange={handleChange}
            setLastItemId={setLastItemId}
            step={step}
            // nextStep={nextStep(setStep,1)} 
            />
        )  
        case 3:
        return(
          <ItemPreviewForm
          nextStep={nextStep}
          prevStep={prevStep}    
          handleChange={handleChange}
          values={values}
          step={step}
          lastItemId={lastItemId}
          // nextStep={nextStep(setStep,1)} 
          />
        )
        case 4:
        return(
          <ItemEditForm
          nextStep={nextStep}
          twoStepsBack={twoStepsBack}    
          handleChange={handleChange}
          lastItemId={lastItemId}
          step={step}
          
          showEditModal={showEditModal}
          showDeleteModal={showDeleteModal}
          openEditModal={openEditModal}
          modalEditId={modalEditId}
          modalEditName={modalEditName}
          modalEditIsActive={modalEditIsActive}
          closeEditModal={closeEditModal}
          modalDeleteId={modalDeleteId}
          openDeleteModal={openDeleteModal}
          closeDeleteModal={closeDeleteModal}
          // nextStep={nextStep(setStep,1)} 
          />
        ) 
    }

  }
  
// const nextStep = (setStep, step) => {
//     return setStep(step + 1)
// };

// const prevStep = (setStep, step) => {
//     return setStep(step - 1)
// };

// const handleChange = (setInput, input) => e => {
//     return setInput({ [input]: e.target.value })
// //   this.setState({ [input]: e.target.value });
// };

  export default MainForm;