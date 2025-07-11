import './App.css'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { AppRouter } from '@router/AppRouter'
import { register } from '@store/authSlice'
import { UserManager, CacheManager } from '@utils/localStorage'
import { SUPER_ADMIN } from '@constant/localStorageItems'
import { initializeAppData, getInitialDataStats } from '@data/initialData'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    // Pulizia della cache scaduta
    CacheManager.cleanExpiredCache()

    // Inizializza dati statici
    initializeAppData()

    // Inizializza l'admin se non presente
    try {
      const existingAdmin = UserManager.findUserByEmail(SUPER_ADMIN.email)
      if (!existingAdmin) {
        dispatch(register(SUPER_ADMIN))
      }
    } catch (error) {
      console.error('Errore nell\'inizializzazione dell\'admin:', error)
    }

    // Mostra statistiche iniziali
    const stats = getInitialDataStats()
    console.log('📊 Statistiche app:', stats)

  }, [dispatch])

  return (
    <>
      <AppRouter />
    </>
  )
}

export default App
