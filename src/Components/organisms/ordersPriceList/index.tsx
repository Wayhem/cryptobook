import Alignments from 'Models/constants/priceAlignments'
import Delta from 'Models/Delta'
import HeaderFields from 'Models/constants/priceFields'
import { PricesContainer, TableHeader, FieldHeader, TableRow, Field } from './styled'

interface PriceListProps {
  alignment: Alignments
  elements: Delta[]
  biggestNumber: number
}

const PriceList = ({ alignment, elements }: PriceListProps) => {
  const headerFields = alignment === Alignments.left ? HeaderFields : HeaderFields.slice(0).reverse()
  const elementsToShow = alignment === Alignments.left ? elements : elements.map(delta => [...delta.slice(0).reverse()])
  const keyIndex = alignment === Alignments.left ? 0 : 2
  const color = alignment === Alignments.left ? 'red' : 'green'

  return (
    <PricesContainer>
      <TableHeader>
        {headerFields.map(el => (
          <FieldHeader key={el}>{el}</FieldHeader>
        ))}
      </TableHeader>
      {elementsToShow.map(delta => (
        <TableRow key={delta[keyIndex]}>
          {delta.map((el, index) => (
            <Field key={el} color={index === keyIndex && color}>
              {index === keyIndex ? el.toFixed(2) : el}
            </Field>
          ))}
        </TableRow>
      ))}
    </PricesContainer>
  )
}

export default PriceList
