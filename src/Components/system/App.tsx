import { ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux'
import { store } from 'Store'
import { GlobalStyle, theme } from 'Config/styled'
import Main from 'Components/pages/main'

const App = (): JSX.Element => (
  <>
    <GlobalStyle />
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Main />
      </ThemeProvider>
    </Provider>
  </>
)

export default App
