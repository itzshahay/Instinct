import { ArticleTypes } from './';
import { AxiosResponse } from 'axios';
import { backendAPI } from 'instinct-frontend';
import { Article } from 'instinct-rp-interfaces';

class ArticleService implements ArticleTypes {
  async getAll() {
    const articles: AxiosResponse<Article[]> = await backendAPI.get('articles');
    return articles.data;
  }

  async getByID(articleID: string) {
    const article: AxiosResponse<Article> = await backendAPI.get(`articles/${articleID}`);
    return article.data;
  }
}

export const articleService: ArticleTypes = new ArticleService();
