import React from 'react'
import { XBTUSD_GROUPS_ENUM, XBTUSD_GROUPS } from 'Models/constants/groups'
import { HeaderContainer, Title, Select, Label } from './styled'

interface HeaderProps {
  title: string
  group: XBTUSD_GROUPS_ENUM
  setGroup: React.Dispatch<React.SetStateAction<XBTUSD_GROUPS_ENUM>>
}

const Header = ({ title, group, setGroup }: HeaderProps): JSX.Element => {
  const onChangeGroup = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const group = parseFloat(e.target.value) as XBTUSD_GROUPS_ENUM

    setGroup(group)
  }

  return (
    <HeaderContainer>
      <Title>{title}</Title>
      <div>
        <Label>group:</Label>
        <Select value={group} onChange={onChangeGroup}>
          {XBTUSD_GROUPS.map((currentGroup: XBTUSD_GROUPS_ENUM) => (
            <option key={currentGroup} value={currentGroup}>
              {currentGroup}
            </option>
          ))}
        </Select>
      </div>
    </HeaderContainer>
  )
}

export default Header
