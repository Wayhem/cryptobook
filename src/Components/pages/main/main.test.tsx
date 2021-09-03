import Main from 'Components/pages/main'
import { render } from 'Utils/test-utils'

describe('Main page component', () => {
  test('Main renders and matches snapshot', () => {
    const { container } = render(<Main />)
    expect(container).toMatchSnapshot()
  })
})
