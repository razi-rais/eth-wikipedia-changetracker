export class Config {
    constructor() { }

    baseUrls: {
        api: {
            articles: string
        },
        wiki: {
            api: string,
            article: string,
            user: string,
            revisionOld: string,
            revisionNew: string,
            contributions: string
        },
        web3: string
    };
    web3: {
        pollInteval: number,
        contractId: string,
        jsonContract: any
    };
}
