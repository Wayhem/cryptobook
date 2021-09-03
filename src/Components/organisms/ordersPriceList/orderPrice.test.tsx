import OrderPrice from 'Components/organisms/ordersPriceList'
import Alignments from 'Models/constants/priceAlignments'
import { render } from 'Utils/test-utils'

describe('OrderPrice page component', () => {
  test('OrderPrice renders and matches snapshot', () => {
    const defaultProps = {
      alignment: Alignments.left,
      elements: [],
      biggestNumber: 0,
      color: 'red',
      colorBg: 'lightRed',
    }
    const { container } = render(<OrderPrice {...defaultProps} />)
    expect(container).toMatchSnapshot()
  })
})
