import { Link } from "react-router-dom";
import articleStyle from "../../assets/styles/articleList.module.css";
import style from "../../assets/styles/loading.module.css";
import EmptyArticleList from "../EmptyArticleList/EmptyArticleList.view";

const CategoryArticlesView = ({ categoryArticlesQuery }) => {
  if (categoryArticlesQuery.isLoading || categoryArticlesQuery.isRefetching) {
    return (
      <>
        <div className={style.article__loading_container}>
          <div className={style.article__loading}></div>
        </div>
      </>
    );
  }
  return (
    <>
      {categoryArticlesQuery.data.length ? (
        <div className={articleStyle.container}>
          {categoryArticlesQuery.data.map((article) => (
            <Link
              key={article.articleId}
              to={`/article/${article.articleId}`}
              className={articleStyle.articleLink}
            >
              <div className={articleStyle.articleBox}>{article.title}</div>
            </Link>
          ))}
        </div>
      ) : (
        <EmptyArticleList />
      )}
    </>
  );
};

export default CategoryArticlesView;
