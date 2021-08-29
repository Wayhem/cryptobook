import styled from 'styled-components'

export const TableHeader = styled.div`
  border-bottom: 1px solid ${props => props.theme.colors.borderGray};
  display: flex;
  justify-content: space-between;
  padding: 6px 12px;
`

export const TableRow = styled(TableHeader)`
  border: none;
  position: relative;
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

export const ProgressBar = styled.div<any>`
  background-color: ${props => props.theme.colors[props.color]};
  z-index: -1;
  position: absolute;
  top: 0;
  left: ${props => props.left};
  right: ${props => props.right};
  height: 28px;
  width: ${props => props.width};
`
