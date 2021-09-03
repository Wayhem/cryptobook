import styled from 'styled-components'

export const Button = styled.button<any>`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: ${props => (props.color ? props.theme.colors[props.color] : props.theme.colors.white)};
  background-color: ${props => (props.bgColor ? props.theme.colors[props.bgColor] : props.theme.colors.blue)};
  margin: ${props => props.margin};
  cursor: pointer;
  border-radius: 3px;

  &:hover {
    opacity: 0.8;
  }
`
