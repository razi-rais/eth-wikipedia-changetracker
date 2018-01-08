import { Moment } from 'moment';

export class Article {
    constructor() { }

    id: string;
    title: string;
    url: string;
    change_type: string;
    comment: string;
    revision_new: string;
    revision_old: string;
    timestamp: Moment;
    user: string;
}
