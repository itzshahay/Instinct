import './RecentNews.scss';
import Moment from 'moment';
import { Link } from 'react-router-dom';
import { Article } from 'instinct-interfaces';
import React, { useEffect, useState } from 'react';
import { defaultRecentNewsState, RecentNewsState } from './';
import { articleService, Card, Loading } from 'instinct-frontend';

export function RecentNews() {
  const [state, setState] = useState<RecentNewsState>(defaultRecentNewsState);

  useEffect(() => {
    async function fetchArticles(): Promise<void> {
      const articles: Article[] = await articleService.getAll();
      setState({
        articles,
        isLoading: false,
      });
    }

    setState(defaultRecentNewsState);
    fetchArticles();
  }, []);

  return (
    <Card header="Recent News">
      <Loading isLoading={state.isLoading}>
        <div className="related-articles-container">
          {state.articles.map(article => (
            <Link className="related-article-container" key={article.id} to={`/community/news/${article.id}`}>
              <div className="related-article-thumbnail" style={{ backgroundImage: `url(${article.thumbnailImage})` }} />
              <div className="related-article-details">
                <div className="related-article-title">{article.title}</div>
                <div className="related-article-date">{Moment.unix(article.datePosted).format('MMM DD, YYYY')}</div>
              </div>
            </Link>
          ))}
        </div>
      </Loading>
    </Card>
  );
}
