import Alignments from 'Models/constants/priceAlignments'
import Delta from 'Models/Delta'
import HeaderFields from 'Models/constants/priceFields'
import { PricesContainer, TableHeader, FieldHeader, TableRow, Field, ProgressBar } from './styled'

interface PriceListProps {
  alignment: Alignments
  elements: Delta[]
  biggestNumber: number
  color: string
  colorBg: string
}

type DeltaRange = 0 | 1 | 2

const PriceList = ({ alignment, elements, biggestNumber, color, colorBg }: PriceListProps) => {
  let headerFields = HeaderFields
  let elementsToShow = elements
  let priceIndex: DeltaRange = 0
  let totalIndex: DeltaRange = 2

  if (alignment === Alignments.right) {
    headerFields = HeaderFields.slice(0).reverse()
    elementsToShow = elements.map((delta): Delta => {
      const reverseDelta = delta.slice(0).reverse()
      return [reverseDelta[0], reverseDelta[1], reverseDelta[2]]
    })
    priceIndex = 2
    totalIndex = 0
  }

  return (
    <PricesContainer>
      <TableHeader>
        {headerFields.map(el => (
          <FieldHeader key={el}>{el}</FieldHeader>
        ))}
      </TableHeader>
      {elementsToShow.map(delta => (
        <TableRow key={delta[priceIndex]}>
          <ProgressBar
            width={`${(delta[totalIndex] / biggestNumber) * 100}%`}
            color={colorBg}
            left={alignment === Alignments.left && 0}
            right={alignment === Alignments.right && 0}
          />
          {delta.map((el, index) => (
            <Field key={index} color={index === priceIndex ? color : undefined}>
              {index === priceIndex ? el.toFixed(2) : el}
            </Field>
          ))}
        </TableRow>
      ))}
    </PricesContainer>
  )
}

export default PriceList
