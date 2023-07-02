import styles from "./Article.module.css";
import UserLogo from "../../assets/images/user_logo.svg";
import BlackLike from "../../assets/images/heart.png";
import RedLike from "../../assets/images/heart_red.png";
import CommentsList from "./CommentsList";
import { NavLink } from "react-router-dom";
import { Parser } from "html-to-react";
import style from "../../assets/styles/loading.module.css";

const ArticleView = ({
  commentsList,
  setCommentsList,
  commentsQuery,
  commentsShow,
  setCommentsShow,
  articleQuery,
  isLike,
  changeLike,
  likesQuery,
  isBookMark,
  setBookMark,
  makeBookmark,
  isSubscribe,
  subscribeToUser,
  changeSubscribe,
}) => {
  if (articleQuery.isLoading || articleQuery.isRefetching) {
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
      <div>
        <div className={styles.user_profile}>
          <div className={styles.user_header}>
            <div className={styles.avatar_wrapper}>
              <NavLink
                to={`/personal_account/${articleQuery.data.users.userId}`}
                className={styles.header__nav_link}
              >
                <img
                  src={UserLogo}
                  alt="user_avatar"
                  className={styles.avatar}
                />
              </NavLink>
            </div>
            <div className={styles.user_info}>
              <NavLink
                to={`/personal_account/${articleQuery.data.users.userId}`}
                className={styles.header__nav_link}
              >
                <h3 className={styles.user_name}>
                  {articleQuery.data.users.username}
                </h3>
              </NavLink>
              {!(
                articleQuery.data.currentUserId ===
                articleQuery.data.users.userId
              ) ? (
                <button
                  className={styles.subscribe_btn}
                  onClick={changeSubscribe}
                >
                  {isSubscribe ? "Отписаться" : "Подписаться"}
                </button>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className={styles.article_wrapper}>
            <div className={styles.article}>
              <h2 className={styles.article_title}>
                {articleQuery.data.title}
              </h2>
              <p className={styles.article_content}>
                <div>{new Parser().parse(articleQuery.data.text)}</div>
              </p>
            </div>
            <div className={styles.actions}>
              <button
                className={styles.comment_btn}
                onClick={() => setCommentsShow((prev) => !prev)}
              >
                {commentsShow ? "Закрыть комментарии" : "Открыть комментарии"}
              </button>
              <button
                className={styles.bookmark_btn}
                onClick={() => makeBookmark()}
              >
                {isBookMark ? "Убрать из закладок" : "Добавить в закладки"}
              </button>
              <div className={styles.bookmark__like}>
                <div className={styles.heart}>
                  <button
                    className={styles.heart_btn}
                    onClick={() => changeLike()}
                  >
                    <img
                      className={styles.heart}
                      alt="like"
                      src={isLike ? RedLike : BlackLike}
                    />
                  </button>
                  <span className={styles.heart_count__span}>
                    {articleQuery.data.likes + (isLike ? 1 : 0)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {commentsShow ? (
          <>
            {articleQuery.isLoading ||
            articleQuery.isRefetching ||
            commentsQuery.isLoading ||
            commentsQuery.isRefetching ||
            !commentsShow ? (
              <>
                <div className={style.article__loading_container}>
                  <div className={style.article__loading}></div>
                </div>
              </>
            ) : (
              <CommentsList
                comments={commentsList}
                commentsList={commentsList}
                setCommentsList={setCommentsList}
              />
            )}
          </>
        ) : null}
      </div>
    </>
  );
};

export default ArticleView;
