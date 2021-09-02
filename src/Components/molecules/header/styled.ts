import styled from 'styled-components'

export const HeaderContainer = styled.div`
  padding: 4px;
  display: flex;
  justify-content: space-between;
  border: 1px solid ${props => props.theme.colors.borderGray};
`

export const Title = styled.div`
  color: ${props => props.theme.colors.white};
`

export const Select = styled.select`
  border-radius: 4px;
  background-color: ${props => props.theme.colors.borderGray};
  color: ${props => props.theme.colors.white};
  padding: 4px 8px;
`

export const Label = styled.label`
  color: ${props => props.theme.colors.white};
  padding-right: 4px;
  text-transform: capitalize;
`
