import styled from 'styled-components'

export const Button = styled.button<any>`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: ${props => (props.color ? props.theme.colors[props.color] : props.theme.colors.white)};
  background-color: ${({ bgColor, theme, disabled }) =>
    disabled ? theme.colors.borderGray : bgColor ? theme.colors[bgColor] : theme.colors.blue};
  margin: ${props => (props.margin ? props.margin : '0 0.5rem')};
  cursor: ${({ disabled }) => (disabled ? 'normal' : 'pointer')};
  border-radius: 3px;

  &:hover {
    opacity: ${({ disabled }) => (disabled ? '1' : '0.8')};
  }
`
