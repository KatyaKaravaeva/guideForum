  import { Link } from "react-router-dom";
  import styles from "../../assets/styles/articleList.module.css";
  import style from "./MainPage.module.css";
  import CommentsIcon from "../../assets/images/comments_icon.svg";
  import BookMarkAdd from "../../assets/images/bookmark_add.svg";
  import BookMarkAdded from "../../assets/images/bookmark_added.svg";
  import styleLoading from "../../assets/styles/loading.module.css";
  import ReturnIcon from "../../assets/images/returnIcon.png";
  import EmptyArticleList from "../EmptyArticleList/EmptyArticleList.view";

  const MainPageView = ({
    handleSubmit,
    articles,
    mainPageQuery,
    isSubscribe,
    setIsSubscribe,
    makeBookmark,
    searchData,
    isSearch,
    setIsSearch,
  }) => {
    if (mainPageQuery.isLoading || mainPageQuery.isRefetching) {
      return (
        <div className={styleLoading.article__loading_container}>
          <div className={styleLoading.article__loading}></div>
        </div>
      );
    }
    return (
      <div>
        {!isSubscribe ? (
          <form
            className={styles.header__search}
            onSubmit={(e) => {
              searchData(e);
              setIsSearch((prev) => true);
            }}
          >
            <button className={styles.header__search_icon} type="submit"></button>
            <input
              className={styles.header__search_field}
              name="search"
              type="text"
              placeholder="search"
            />
          </form>
        ) : (
          ""
        )}

        <div className={style.switching_block}>
          <div className={style.switching}>
            {!isSubscribe ? "Все статьи" : "Подписки"}
          </div>

          {isSearch && (
            <button
              className={style.header__return_btn}
              onClick={(e) => {
                setIsSearch((prev) => false);
                handleSubmit(e);
              }}
            >
              <img className={style.header__return_img} src={ReturnIcon} />
            </button>
          )}

          {!isSearch && (
            <div className={style.change_articles_button}>
              <button
                className={style.subscribe_articles_button}
                onClick={(e) => {
                  setIsSubscribe((prev) => !prev);
                  handleSubmit(e);
                }}
              >
                {isSubscribe ? "Все статьи" : "Подписки"}
              </button>
            </div>
          )}
        </div>
        {articles.length ? (
          <div className={styles.container}>
            {articles.map((article, index) => (
              <Link
                key={index}
                to={`/article/${article.articleId}`}
                className={styles.articleLink}
              >
                <div className={styles.articleBox}>
                  <div className={styles.articleTitle}>{article.title}</div>
                  <div
                    className={style.articleBoxButtons}
                    onClick={(e) => e.preventDefault()}
                  >
                    <Link
                      className={style.articleButton}
                      to={`/article/${article.articleId}?comments=true`}
                    >
                      <img className={style.commentIcon} src={CommentsIcon} />
                    </Link>
                    <button
                      className={style.articleButton}
                      onClick={(e) => {
                        e.preventDefault();
                        makeBookmark(article);
                      }}
                    >
                      <img
                        className={style.bookmarkIcon}
                        src={article.statusSave ? BookMarkAdded : BookMarkAdd}
                      />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <EmptyArticleList />
        )}
      </div>
    );
  };

  export default MainPageView;
