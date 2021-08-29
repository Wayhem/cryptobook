import { HeaderContainer, Title, Select } from './styled'

interface HeaderProps {
  title: string
  group: number
}

const Header = ({ title, group }: HeaderProps): JSX.Element => (
  <HeaderContainer>
    <Title>{title}</Title>
    <Select value='dababy'>
      <option value='dababy'>lets goooo&#8626;</option>
    </Select>
  </HeaderContainer>
)

export default Header
