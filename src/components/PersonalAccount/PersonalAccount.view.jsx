import styles from "./PersonalAccount.module.css";
import UserLogo from "../../assets/images/user_logo.svg";
import SubscriptionList from "./SubscriptionList";
import style from "../../assets/styles/loading.module.css";
import stylesArticle from "../../assets/styles/articleList.module.css";
import { Link } from "react-router-dom";

const PersonalAccountView = ({
  imageString,
  userPostsQuery,
  personalAccountQuery,
  subscribersAccountQuery,
  subscriptionQuery,
  showSubscription,
  setSubscription,
  showSubscribers,
  setSubscribers,
  subscribeList,
  setSubscribeList,
  subscribersList,
  setSubscribersList,
}) => {
  if (personalAccountQuery.isLoading || personalAccountQuery.isRefetching) {
    return (
      <>
        <div className={style.article__loading_container}>
          <div className={style.article__loading}></div>
        </div>
      </>
    );
  }
  return (
    <div className={styles.profile}>
      <div className={styles.profile__frame}>
        <img
          className={styles.profile__picture}
          src={imageString ? imageString : UserLogo}
          alt="Profile Picture"
        />
        <h2 className={styles.profile__name}>
          {personalAccountQuery.data.username}
        </h2>
      </div>
      <div className={styles.profile__container}>
        <div className={styles.profile__info}>
          <form className={styles.profile__form}>
            <div className={styles.profile__data}>
              <label className={styles.profile__label}>Имя пользователя</label>
              <input
                className={styles.profile__input}
                type="text"
                placeholder="Введите имя пользователя"
                disabled={true}
                value={personalAccountQuery.data.username}
              />
            </div>
            <div className={styles.profile__data}>
              <label className={styles.profile__label}>Реквизиты</label>
              <input
                className={styles.profile__input}
                type="text"
                placeholder="Введите реквизиты"
                disabled={true}
                value={personalAccountQuery.data.cardDetails}
              />
            </div>
            <div className={styles.profile__data}>
              <label className={styles.profile__label}>О себе</label>
              <input
                className={styles.profile__input}
                type="text"
                placeholder="Расскажите немного о себе"
                disabled={true}
                value={personalAccountQuery.data.profile}
              />
            </div>
          </form>
          <div className={stylesArticle.container}>
            {!personalAccountQuery.isLoading &&
              !personalAccountQuery.isRefetching &&
              userPostsQuery.data?.map((article) => (
                <Link
                  key={article.articleId}
                  to={`/article/${article.articleId}`}
                  className={stylesArticle.articleLink}
                >
                  <div className={stylesArticle.articleBox}>
                    {article.title}
                  </div>
                </Link>
              ))}
          </div>
        </div>
        <div className={styles.subscription_and_subscribers__data}>
          <div className={styles.subscription__data}>
            <button
              className={styles.subscription_btn}
              onClick={() => setSubscription((prev) => !prev)}
            >
              {showSubscription ? "Скрыть подписки" : "Показать подписки"}
            </button>
            {showSubscription ? (
              !subscribeList.length ? (
                <p className={styles.subscription__stop_out}>Подписок нет</p>
              ) : (
                <>
                  {subscriptionQuery.isLoading ||
                  subscriptionQuery.isRefetching ||
                  !showSubscription ? (
                    <>
                      <div className={style.article__loading_container}>
                        <div className={style.article__loading}></div>
                      </div>
                    </>
                  ) : (
                    <SubscriptionList
                      usersList={subscribeList}
                      setUsersList={setSubscribeList}
                    />
                  )}
                </>
              )
            ) : null}
          </div>

          <div className={styles.subscribers__data}>
            <button
              className={styles.subscribers_btn}
              onClick={() => setSubscribers((prev) => !prev)}
            >
              {showSubscribers ? "Скрыть подписчиков" : "Показать подписчиков"}
            </button>

            {showSubscribers ? (
              !subscribersList.length ? (
                <p className={styles.subscription__stop_out}>Подписчиков нет</p>
              ) : (
                <>
                  {personalAccountQuery.isLoading ||
                  personalAccountQuery.isRefetching ||
                  subscribersAccountQuery.isLoading ||
                  subscribersAccountQuery.isRefetching ||
                  !showSubscribers ? (
                    <>
                      <div className={style.article__loading_container}>
                        <div className={style.article__loading}></div>
                      </div>
                    </>
                  ) : (
                    <SubscriptionList
                      usersList={subscribersList}
                      setUsersList={setSubscribersList}
                    />
                  )}
                </>
              )
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalAccountView;
