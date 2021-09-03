import { FC, ReactElement } from 'react'
import { render, RenderOptions, RenderResult, Queries } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux'
import { MemoryRouter as Router } from 'react-router-dom'
import { store } from 'Store'
import { theme } from 'Config/styled'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AllTheProviders: FC = ({ children }: { children?: any }) => (
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <Router>{children}</Router>
    </Provider>
  </ThemeProvider>
)

AllTheProviders.defaultProps = {
  children: <></>,
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'queries'>): RenderResult<Queries, HTMLElement> =>
  render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'

export { customRender as render }
