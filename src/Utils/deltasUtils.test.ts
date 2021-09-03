import { orderBookMock } from 'Utils/mocks/orderBook'
import { messageMock } from 'Utils/mocks/updateMessageMock'
import { getOrderBookWithUpdatedDeltas } from 'Utils/deltasUtils'

describe('deltasUtils testing:', () => {
  test('getOrderBookWithUpdatedDeltas to get updated bids and asks:', () => {
    const { bids, asks } = messageMock
    expect(getOrderBookWithUpdatedDeltas(asks, orderBookMock, true)).toEqual([
      [50149, 110, 110],
      [50163, 2500, 2500],
      [50164, 2500, 2500],
      [50165, 620, 620],
      [50167, 23937, 23937],
      [50169, 5000, 5000],
      [50169.5, 9200, 9200],
      [50172, 20000, 20000],
      [50174.5, 4780, 4780],
      [50175.5, 12413, 12413],
      [50177.5, 570, 570],
      [50179.5, 28000, 56570],
      [50180.5, 9052, 9052],
      [50181, 9339, 9339],
      [50181.5, 2500, 2500],
      [50182, 6102, 6102],
      [50183, 20000, 40000],
      [50184.5, 10000, 20000],
      [50185.5, 7500, 7500],
      [50189, 62997, 62997],
      [50189.5, 20000, 20000],
      [50190, 10038, 10038],
      [50192.5, 2500, 2500],
      [50193.5, 21978, 21978],
      [50194, 20000, 20000],
      [50198.5, 2927, 2927],
      [50244.5, 2083, 2083],
    ])

    expect(getOrderBookWithUpdatedDeltas(bids, orderBookMock, false)).toEqual([
      [50145.5, 6111, 6111],
      [50140.5, 1120, 1120],
      [50137, 4745, 4745],
      [50133.5, 2323, 2323],
      [50131.5, 4608, 4608],
      [50130.5, 2500, 2500],
      [50129.5, 2500, 2500],
      [50126, 48000, 48000],
      [50125.5, 64836, 64836],
      [50121.5, 9737, 9737],
      [50120.5, 9743, 9743],
      [50120, 60000, 60000],
      [50119.5, 2500, 2500],
      [50118.5, 3085, 3085],
      [50116, 9548, 9548],
      [50115.5, 6102, 6102],
      [50114.5, 5000, 5000],
      [50112.5, 450, 450],
      [50111, 58144, 58144],
      [50110.5, 154441, 154441],
      [50110, 11705, 11705],
      [50107.5, 122500, 122500],
      [50100.5, 1975, 1975],
      [50098, 31913, 61913],
      [50097.5, 15386, 15386],
    ])
  })
})
