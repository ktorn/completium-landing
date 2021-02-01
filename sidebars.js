module.exports = {
  docs:  ['doc1', 'doc2', 'doc3'],
  tools:  [
    'dapp-tools/tools1',
    'dapp-tools/tools10',
    'dapp-tools/tools9',
    'dapp-tools/tools8',
    'dapp-tools/tools7',
    'dapp-tools/tools3',
    'dapp-tools/tools2',
      'dapp-tools/tools4',
      'dapp-tools/tools5',
      'dapp-tools/tools6',
    ],
  miles : {
    type: 'category',
    label: 'Getting Started',
    collapsed: false,
    items: ['installation', 'configuration', 'typescript-support'],
  },
  miles: [
    'dapp-miles/miles1',
    'dapp-miles/miles4',
    {
      type: 'category',
      label: 'Use Case',
      items: [
        'dapp-miles/miles2', 'dapp-miles/miles3', 'dapp-miles/miles5'
      ],
    },
    {
      type: 'category',
      label: 'Technical Guide',
      items: [
        'dapp-miles/miles6', 'dapp-miles/miles7', 'dapp-miles/miles8'
      ]
    },
    {
      type: 'category',
      label: 'Smart Contract',
      items: [
        'dapp-miles/miles10',
        'dapp-miles/miles9',
        'dapp-miles/miles11'
      ]
    }
  ],
  iot:   ['dapp-iot/iot1'],
  game:  ['dapp-game/game1'],
  ideabox: ['dapp-ideabox/ideabox1'],
  escrow: ['dapp-escrow/escrow1'],
  nonfungible: ['dapp-nonfungible/nonfungible1'],
  dex: ['dapp-dex/dex1'],
  zcb: ['dapp-zcb/zcb1'],
  bids: ['dapp-bids/bids1'],
};
