module.exports = {
  docs:  ['doc1', 'doc2', 'doc3'],
  tools:  [
    'dapp-tools/tools1',
    {
      type: 'category',
      label: 'Blockchain',
      items: [
        'dapp-tools/tools8',
        { type: 'category',
          label: 'Archetype',
          items: [
            'dapp-tools/tools7',
            { type: 'category',
              label: 'Tutorial',
              items: [
                'dapp-tools/tutorials/tuto1',
                'dapp-tools/tutorials/tuto2',
                'dapp-tools/tutorials/tuto3',
                'dapp-tools/tutorials/tuto4',
                'dapp-tools/tutorials/tuto5',
                'dapp-tools/tutorials/tuto6',
                'dapp-tools/tutorials/tuto7',
                'dapp-tools/tutorials/tuto8',
                'dapp-tools/tutorials/tuto9',
              ] }
            ] },
            'dapp-tools/tools3',
          ]
    },
    {
      type: 'category',
      label: 'User Interface',
      items: [
        'dapp-tools/tools10',
        'dapp-tools/tools9',
        'dapp-tools/tools2',
      ]
    },
    {
      type: 'category',
      label: 'Tools',
      items: [
        'dapp-tools/tools6',
        'dapp-tools/tools4',
        'dapp-tools/tools5',
      ]
    },
    ],
  first: [
    'dapp-first/first0',
    'dapp-first/first1',
    'dapp-first/first2',
  ],
  miles: [
    'dapp-miles/miles1',
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
  iot: [
    'dapp-iot/iot1',
    {
      type: 'category',
      label: 'Use Case',
      items: [
        'dapp-iot/iot3', 'dapp-iot/iot4', 'dapp-iot/iot40'
      ],
    },
    {
      type: 'category',
      label: 'Technical Guide',
      items: [
        'dapp-iot/iot5', 'dapp-iot/iot6', 'dapp-iot/iot7'
      ]
    },
    {
      type: 'category',
      label: 'Smart Contract',
      items: [
        'dapp-iot/iot8',
        'dapp-iot/iot9',
      ]
    }
  ],
  game: [
    'dapp-game/game1',
    {
      type: 'category',
      label: 'Use Case',
      items: [
        'dapp-game/game3', 'dapp-game/game4'
      ],
    },
    {
      type: 'category',
      label: 'Technical Guide',
      items: [
        'dapp-game/game5', 'dapp-game/game6', 'dapp-game/game7'
      ]
    },
    {
      type: 'category',
      label: 'Smart Contract',
      items: [
        'dapp-game/game8',
        'dapp-game/game9',
      ]
    }
  ],
  ideabox: [
    'dapp-ideabox/ideabox1',
    {
      type: 'category',
      label: 'Use Case',
      items: [
        'dapp-ideabox/ideabox3', 'dapp-ideabox/ideabox4', 'dapp-ideabox/ideabox10'
      ],
    },
    {
      type: 'category',
      label: 'Technical Guide',
      items: [
        'dapp-ideabox/ideabox5', 'dapp-ideabox/ideabox6', 'dapp-ideabox/ideabox7'
      ]
    },
    {
      type: 'category',
      label: 'Smart Contract',
      items: [
        'dapp-ideabox/ideabox8',
        'dapp-ideabox/ideabox9',
      ]
    }
  ],
  escrow: [
    'dapp-escrow/escrow1',
    {
      type: 'category',
      label: 'Use Case',
      items: [
        'dapp-escrow/escrow3', 'dapp-escrow/escrow4'
      ],
    },
    {
      type: 'category',
      label: 'Technical Guide',
      items: [
        'dapp-escrow/escrow5', 'dapp-escrow/escrow6', 'dapp-escrow/escrow7'
      ]
    },
    {
      type: 'category',
      label: 'Smart Contract',
      items: [
        'dapp-escrow/escrow8',
        'dapp-escrow/escrow9',
      ]
    }
  ],
  nonfungible: [
    'dapp-nonfungible/nonfungible1',
    {
      type: 'category',
      label: 'Use Case',
      items: [
        'dapp-nonfungible/nonfungible3', 'dapp-nonfungible/nonfungible4', 'dapp-nonfungible/nonfungible10'
      ],
    },
    {
      type: 'category',
      label: 'Technical Guide',
      items: [
        'dapp-nonfungible/nonfungible5', 'dapp-nonfungible/nonfungible6', 'dapp-nonfungible/nonfungible7'
      ]
    },
    {
      type: 'category',
      label: 'FA 2 Smart Contract',
      items: [
        'dapp-nonfungible/nonfungible8',
        'dapp-nonfungible/nonfungible9',
      ]
    }
  ],
  dex: [
    'dapp-dex/dex1',
    {
      type: 'category',
      label: 'Use Case',
      items: [
        'dapp-dex/dex3', 'dapp-dex/dex4',  'dapp-dex/dex10'
      ],
    },
    {
      type: 'category',
      label: 'Technical Guide',
      items: [
        'dapp-dex/dex5', 'dapp-dex/dex6', 'dapp-dex/dex7'
      ]
    },
    {
      type: 'category',
      label: 'Smart Contracts',
      items: [
        {
          type: 'category',
          label: 'DEX',
          items: [ 'dapp-dex/dex8',
                   'dapp-dex/dex9', ]
        },
        {
          type: 'category',
          label: 'FA 1.2',
          items: [
            'dapp-dex/dex11',
            'dapp-dex/dex12',
            'dapp-dex/dex13',
          ]
        },

      ]
    }
  ],
  zcb: [
    'dapp-zcb/zcb1',
    {
      type: 'category',
      label: 'Use Case',
      items: [
        'dapp-zcb/zcb3', 'dapp-zcb/zcb4'
      ],
    },
    {
      type: 'category',
      label: 'Technical Guide',
      items: [
        'dapp-zcb/zcb5', 'dapp-zcb/zcb6', 'dapp-zcb/zcb7'
      ]
    },
    {
      type: 'category',
      label: 'Smart Contract',
      items: [
        'dapp-zcb/zcb8',
        'dapp-zcb/zcb9',
      ]
    }
  ],
  bids: ['dapp-bids/bids1'],
};
