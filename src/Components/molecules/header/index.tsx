import React from 'react'
import { XBTUSD_GROUPS_ENUM, XBTUSD_GROUPS, ETHUSD_GROUPS_ENUM, ETHUSD_GROUPS } from 'Models/constants/groups'
import ProductIds from 'Models/constants/productIds'
import { HeaderContainer, Title, Select, Label } from './styled'

interface HeaderProps {
  title: string
  group: XBTUSD_GROUPS_ENUM | ETHUSD_GROUPS_ENUM
  setGroup: React.Dispatch<React.SetStateAction<XBTUSD_GROUPS_ENUM | ETHUSD_GROUPS_ENUM>>
  productId: ProductIds
}

const Header = ({ title, group, setGroup, productId }: HeaderProps): JSX.Element => {
  const onChangeGroup = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const group = parseFloat(e.target.value) as XBTUSD_GROUPS_ENUM

    setGroup(group)
  }

  const renderCurrentGroup = (currentGroup: XBTUSD_GROUPS_ENUM | ETHUSD_GROUPS_ENUM) => (
    <option key={currentGroup} value={currentGroup}>
      {currentGroup}
    </option>
  )

  return (
    <HeaderContainer>
      <Title>{title}</Title>
      <div>
        <Label>group:</Label>
        <Select value={group} onChange={onChangeGroup}>
          {productId === ProductIds.PI_XBTUSD
            ? XBTUSD_GROUPS.map(currentGroup => renderCurrentGroup(currentGroup))
            : ETHUSD_GROUPS.map(currentGroup => renderCurrentGroup(currentGroup))}
        </Select>
      </div>
    </HeaderContainer>
  )
}

export default Header
