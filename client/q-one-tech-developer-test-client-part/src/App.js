import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'


import MainForm from './components/MainForm'

function App() {
  const { user } = useAuthContext()

  return (
      <BrowserRouter>
          <Routes>
            <Route 
              path="/" 
              element={<MainForm />}
            />
          </Routes>
       </BrowserRouter>
   );
}

export default App;