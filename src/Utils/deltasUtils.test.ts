import { orderBookMock } from 'Utils/mocks/orderBook'
import { messageMock } from 'Utils/mocks/updateMessageMock'
import { getUpdatedDeltas, groupDeltasByNumber } from 'Utils/deltasUtils'
import { XBTUSD_GROUPS_ENUM } from 'Models/constants/groups'
import { updatedOrderBook } from './mocks/updatedOrderBockMock'
import { groupedBidsByLarge, groupedAsksByMedium } from './mocks/groupedBidsAndAsks'

describe('deltasUtils testing:', () => {
  test('getUpdatedDeltas to get updated bids and asks:', () => {
    const { bids, asks } = messageMock
    expect(getUpdatedDeltas(asks, orderBookMock, true)).toEqual(updatedOrderBook.asks)

    expect(getUpdatedDeltas(bids, orderBookMock, false)).toEqual(updatedOrderBook.bids)
  })

  test('groupDeltasByNumber groups adequatly in different groups:', () => {
    const { bids, asks } = orderBookMock
    expect(groupDeltasByNumber(XBTUSD_GROUPS_ENUM.large, bids)).toEqual(groupedBidsByLarge)

    expect(groupDeltasByNumber(XBTUSD_GROUPS_ENUM.medium, asks)).toEqual(groupedAsksByMedium)
  })
})
