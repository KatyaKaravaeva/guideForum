import { NavLink } from "react-router-dom";
import styles from "./SubscriptionList.module.css";
import UserLogo from "../../../assets/images/user_logo.svg";

const SubscriptionListView = ({ usersList, setUsersList }) => {
  return (
    <div className={styles.container}>
      <div className={styles.subscription_list__get_subscription}>
        {usersList?.map((subscription) => (
          <div className={styles.subscription} key={subscription.userId}>
            <NavLink
              className={styles.subscription_header__nav_link}
              to={`/personal_account/${subscription.userId}`}
              // onClick={() => setUsersList((prev) => !prev)}
            >
              <img
                className={styles.profile__picture}
                src={UserLogo}
                alt="Profile Picture"
              />
              <span className={styles.subscription__username}>
                {subscription.username}
              </span>
            </NavLink>
            <div className={styles.subscription__info}>
              <span className={styles.subscription__date}>
                {subscription.date}
              </span>
              <span className={styles.subscription__status}>
                {subscription.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionListView;
