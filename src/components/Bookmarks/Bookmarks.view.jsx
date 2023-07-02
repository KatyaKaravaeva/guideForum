import { Link } from "react-router-dom";
import styles from "../../assets/styles/articleList.module.css";
import style from "../../assets/styles/loading.module.css";
import EmptyArticleList from "../EmptyArticleList/EmptyArticleList.view";

const BookmarksView = ({ bookMarksQuery }) => {
  if (bookMarksQuery.isLoading || bookMarksQuery.isRefetching) {
    return (
      <>
        <div className={style.article__loading_container}>
          <div className={style.article__loading}></div>
        </div>
      </>
    );
  }
  return (
    <div className={styles.container}>
      {bookMarksQuery.data.length ? (
        <div>
          {bookMarksQuery.data.map((article) => (
            <Link
              key={article.articleId}
              to={`/article/${article.articleId}`}
              className={styles.articleLink}
            >
              <div className={styles.articleBox}>{article.title}</div>
            </Link>
          ))}
        </div>
      ) : (
        <EmptyArticleList />
      )}
    </div>
  );
};

export default BookmarksView;
