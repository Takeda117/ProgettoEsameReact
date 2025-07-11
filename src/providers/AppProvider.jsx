import { Provider } from 'react-redux'
import { store } from '../store/store'
import { BrowserRouter } from 'react-router-dom'

export const AppProviders = ({ children }) => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                {children}
            </BrowserRouter>
        </Provider>
    )
}
