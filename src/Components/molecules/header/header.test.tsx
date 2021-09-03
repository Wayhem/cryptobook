import Header from 'Components/molecules/header'
import { XBTUSD_GROUPS_ENUM } from 'Models/constants/groups'
import ProductIds from 'Models/constants/productIds'
import { render } from 'Utils/test-utils'

describe('Header page component', () => {
  test('Header renders and matches snapshot', () => {
    const defaultProps = {
      title: 'Hello',
      group: XBTUSD_GROUPS_ENUM.small,
      setGroup: jest.fn(),
      productId: ProductIds.PI_XBTUSD,
    }

    const { container } = render(<Header {...defaultProps} />)
    expect(container).toMatchSnapshot()
  })
})
