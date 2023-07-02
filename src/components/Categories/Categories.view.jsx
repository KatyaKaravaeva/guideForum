import { Link } from "react-router-dom";
import styles from "../../assets/styles/articleList.module.css";
import style from "../../assets/styles/loading.module.css";
import EmptyArticleList from "../EmptyArticleList/EmptyArticleList.view";

const CategoriesView = ({ categoriesQuery }) => {
  if (categoriesQuery.isLoading || categoriesQuery.isRefetching) {
    return (
      <div className={style.article__loading_container}>
        <div className={style.article__loading}></div>
      </div>
    );
  }
  return (
    <>
      {categoriesQuery.data.length ? (
        <div className={styles.container}>
          {categoriesQuery.data.map((category) => (
            <Link
              key={category.id}
              to={`/categories/${category.id}`}
              className={styles.articleLink}
            >
              <div className={styles.articleBox}>{category.name}</div>
            </Link>
          ))}
        </div>
      ) : (
        <EmptyArticleList />
      )}
    </>
  );
};

export default CategoriesView;
