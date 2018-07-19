export default {
  pickedCard: {
    type: Object,
    default () {
      return {
        key: '广发欢乐卡(7521)',
        value: '6222022000000000007521',
        selected: true,
        iconType: 'CGB'
      }
    }
  },
  cardList: {
    type: Object,
    default () {
      return {
        normal: [
          {
            key: '广发欢乐卡(7521)',
            value: '6222022000000000007521',
            selected: true,
            iconType: 'CGB'
          },
          {
            key: '农行卡(7520)',
            value: '6222022222221122127520',
            selected: false,
            iconType: 'ABC'
          }
        ],
        pause: [
          {
            key: '广发欢乐卡(8735)',
            value: '6222022222221122128735',
            iconType: 'CGB'
          },
          {
            key: '农行卡(4467)',
            value: '6222022222221122124467',
            iconType: 'default'
          }
        ],
        disable: [
          {
            key: '广发欢乐卡(2120)',
            value: '6222022222221122122120',
            iconType: 'CGB'
          },
          {
            key: '农行卡(7329)',
            value: '6222022222221122127329',
            iconType: 'default'
          }
        ]
      }
    }
  }
}