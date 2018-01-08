import { Article } from './article.model';

export class ArticlePost {
    constructor(
        public UserID: string,
        public Articles: Article[]
    ) { }
}
