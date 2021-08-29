import styled from 'styled-components'

export const TableHeader = styled.div`
  border-bottom: 1px solid ${props => props.theme.colors.borderGray};
  display: flex;
  justify-content: space-between;
  padding: 6px 12px;
`

export const TableRow = styled(TableHeader)`
  border: none;
`

export const FieldHeader = styled.div`
  color: ${props => props.theme.colors.textGray};
  text-align: right;
  width: 80px;
  text-transform: uppercase;
`

export const Field = styled.div<any>`
  color: ${props => (props.color ? props.theme.colors[props.color] : props.theme.colors.white)};
  text-align: right;
  width: 80px;
`

export const PricesContainer = styled.div`
  width: 50%;

  @media (max-width: 768px) {
    width: 100%;
  }
`
