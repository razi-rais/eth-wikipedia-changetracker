export let CONFIG = {
    baseUrls: {
        web3: 'http://localhost:8545',
        articles: '/api/Articles'
    },
    web3: {
        pollInteval: 3 * 1000, // 3 seconds
        contractId: '0x804d46b01ea3206fd137f88ba2992f079fc05de4', // '0x551db3f1ee78e4e35b337fd10589719bb2f14df4',
        jsonContract: [
            {
                'constant': false,
                'inputs': [
                    {
                        'name': 'id',
                        'type': 'uint256'
                    },
                    {
                        'name': 'title',
                        'type': 'string'
                    },
                    {
                        'name': 'url',
                        'type': 'string'
                    },
                    {
                        'name': 'revision_old',
                        'type': 'uint256'
                    },
                    {
                        'name': 'revision_new',
                        'type': 'uint256'
                    },
                    {
                        'name': 'timestamp',
                        'type': 'uint256'
                    },
                    {
                        'name': 'change_type',
                        'type': 'string'
                    },
                    {
                        'name': 'user',
                        'type': 'string'
                    },
                    {
                        'name': 'comment',
                        'type': 'string'
                    }
                ],
                'name': 'UpdateArticleHistory',
                'outputs': [],
                'payable': false,
                'stateMutability': 'nonpayable',
                'type': 'function'
            },
            {
                'inputs': [],
                'payable': false,
                'stateMutability': 'nonpayable',
                'type': 'constructor'
            },
            {
                'anonymous': false,
                'inputs': [
                    {
                        'indexed': false,
                        'name': '',
                        'type': 'address'
                    },
                    {
                        'indexed': false,
                        'name': 'id',
                        'type': 'uint256'
                    },
                    {
                        'indexed': false,
                        'name': 'title',
                        'type': 'string'
                    },
                    {
                        'indexed': false,
                        'name': 'url',
                        'type': 'string'
                    },
                    {
                        'indexed': false,
                        'name': 'revision_old',
                        'type': 'uint256'
                    },
                    {
                        'indexed': false,
                        'name': 'revision_new',
                        'type': 'uint256'
                    },
                    {
                        'indexed': false,
                        'name': 'timestamp',
                        'type': 'uint256'
                    },
                    {
                        'indexed': false,
                        'name': 'change_type',
                        'type': 'string'
                    },
                    {
                        'indexed': false,
                        'name': 'user',
                        'type': 'string'
                    },
                    {
                        'indexed': false,
                        'name': 'comment',
                        'type': 'string'
                    }
                ],
                'name': 'articleUpdateEvent',
                'type': 'event'
            }
        ]
    }
};
