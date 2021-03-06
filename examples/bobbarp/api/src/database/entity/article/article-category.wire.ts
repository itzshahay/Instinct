import {ArticleCategory} from 'instinct-rp-interfaces';
import {ArticleCategoryEntity} from './article-category.entity';

export function articleCategoryWire(articleCategoryEntity: ArticleCategoryEntity): ArticleCategory {
  return {
    id: articleCategoryEntity.id!,
    name: articleCategoryEntity.category,
  };
}
