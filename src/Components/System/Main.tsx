import { ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux'
import { store } from 'Store'
import { GlobalStyle, theme } from 'Config/styled'

const App = (): JSX.Element => (
  <>
    <GlobalStyle />
    <Provider store={store}>
      <ThemeProvider theme={theme}>hello</ThemeProvider>
    </Provider>
  </>
)

export default App
