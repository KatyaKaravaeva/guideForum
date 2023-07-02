import styles from "./Profile.module.css";
import UserLogo from "../../assets/images/user_logo.svg";
import SubscriptionListUser from "./SubscriptionListUser";
import stylesArticle from "../../assets/styles/articleList.module.css";
import styleLoading from "../../assets/styles/loading.module.css";
import MaskedInput from "react-input-mask";

import { Link } from "react-router-dom";
const ProfileView = ({
  imageString,
  userPostsQuery,
  subscriptionProfileQuery,
  subscribersProfileQuery,
  showSubscription,
  setSubscription,
  subscribeList,
  subscribersList,
  setSubscribers,
  showSubscribers,
  setSubscribeList,
  setSubscribersList,
  profileQuery,
  isActive,
  setIsActive,
  handleSubmit,
  userData,
  setUserData,
  changeHandler,
}) => {
  if (userPostsQuery.isLoading || userPostsQuery.isRefetching) {
    return (
      <>
        <div className={styleLoading.article__loading_container}>
          <div className={styleLoading.article__loading}></div>
        </div>
      </>
    );
  }
  return (
    <div className={styles.profile}>
      <div className={styles.profile__frame}>
        <div className={styles.profile__picture_block}>
          <img
            className={styles.profile__picture}
            src={(imageString) ? imageString : UserLogo}
            alt="Profile Picture"
          />
          <label htmlFor="avatarInput" className={styles.customFileButton}>
            Выбрать аватарку
            <input
              id="avatarInput"
              accept="image/png, image/jpeg"
              type="file"
              onChange={(e) => changeHandler(e)}
            />
          </label>
        </div>
        <h2 className={styles.profile__name}>{userData.username}</h2>
      </div>
      <div className={styles.profile__container}>
        <div className={styles.profile__info}>
          <form
            className={styles.profile__form}
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className={styles.profile__data}>
              <label className={styles.profile__label}>Имя пользователя</label>
              <input
                className={styles.profile__input}
                type="text"
                placeholder="Введите имя пользователя"
                disabled={!isActive}
                value={userData.username || ""}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    username: e.target.value,
                  }))
                }
              />
            </div>
            <div className={styles.profile__data}>
              <label className={styles.profile__label}>Реквизиты</label>
              <MaskedInput
                mask="9999 9999 9999 9999"
                disabled={!isActive}
                className={styles.profile__input}
                placeholder="Введите номер карты"
                value={userData.cardDetails || ""}
                onChange={(e) => {
                  const updatedCardDetails = e.target.value;
                  setUserData((prevUserData) => ({
                    ...prevUserData,
                    cardDetails: updatedCardDetails,
                  }));
                }}
              />
            </div>
            <div className={styles.profile__data}>
              <label className={styles.profile__label}>О себе</label>
              <input
                className={styles.profile__input}
                type="text"
                placeholder="Расскажите немного о себе"
                disabled={!isActive}
                value={userData.profile || ""}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    profile: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <button
                className={styles.profile__button}
                onClick={() => setIsActive((prev) => !prev)}
              >
                {!isActive ? "Редактировать" : "Сохранить"}
              </button>
            </div>
          </form>
          <div className={stylesArticle.container}>
            {userPostsQuery.data?.map((article) => (
              <Link
                key={article.articleId}
                to={`/article/${article.articleId}`}
                className={stylesArticle.articleLink}
              >
                <div className={stylesArticle.articleBox}>{article.title}</div>
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
                  {profileQuery.isLoading ||
                  profileQuery.isRefetching ||
                  subscriptionProfileQuery.isLoading ||
                  subscriptionProfileQuery.isRefetching ||
                  !showSubscription ? (
                    <>
                      <div className={styleLoading.article__loading_container}>
                        <div className={styleLoading.article__loading}></div>
                      </div>
                    </>
                  ) : (
                    <SubscriptionListUser
                      subscriptionFlag={true}
                      subscriptionList={subscribeList}
                      setSubscribeList={setSubscribeList}
                      setSubscription={setSubscription}
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
                  {profileQuery.isLoading ||
                  profileQuery.isRefetching ||
                  subscribersProfileQuery.isLoading ||
                  subscribersProfileQuery.isRefetching ||
                  !showSubscribers ? (
                    <>
                      <div className={styleLoading.article__loading_container}>
                        <div className={styleLoading.article__loading}></div>
                      </div>
                    </>
                  ) : (
                    <SubscriptionListUser
                      subscriptionFlag={false}
                      subscriptionList={subscribersList}
                      setSubscribeList={setSubscribersList}
                      setSubscription={setSubscribers}
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

export default ProfileView;
