import { NavLink } from "react-router-dom";
import UserLogo from "../../assets/images/user_logo.svg";
import CategoryLogo from "../../assets/images/category_img.svg";
import CreateArticleLogo from "../../assets/images/create_article_img.svg";
import PostsLogo from "../../assets/images/posts_img.svg";
import BookMarksLogo from "../../assets/images/bookmarks_img.svg";
import Exit from "../../assets/images/exit.svg";
import Logo from "../../assets/images/logo.svg";
import styles from "./Header.module.css";
import {
  PROFILE,
  ROOT,
  CATEGORIES,
  USER_POSTS,
  BOOKMARKS,
  CREATE_ARTICLE,
} from "../../navigation/routes";
import { useSelector } from "react-redux";

const HeaderView = ({ exit }) => {
  const userAuthentication = useSelector((state) => state.user.isAuth);
  return (
    <>
      <header className={styles.header}>
        <div className={styles.header__container}>
          {userAuthentication ? (
            <NavLink to={PROFILE} className={styles.header__logo}>
              <img src={UserLogo} />
            </NavLink>
          ) : null}
          <NavLink to={ROOT} className={styles.header__title}>
            <img src={Logo} />
          </NavLink>
          {userAuthentication ? (
            <>
              <nav className={styles.header__nav}>
                <ul className={styles.header__nav_list}>
                  <li className={styles.header__nav_item}>
                    <NavLink
                      to={CATEGORIES}
                      className={styles.header__nav_link}
                      data-title="Категории"
                    >
                      <img src={CategoryLogo} />
                    </NavLink>
                  </li>
                  <li className={styles.header__nav_item}>
                    <NavLink
                      to={CREATE_ARTICLE}
                      className={styles.header__nav_link}
                      data-title="Редактор"
                    >
                      <img src={CreateArticleLogo} />
                    </NavLink>
                  </li>
                  <li className={styles.header__nav_item}>
                    <NavLink
                      to={USER_POSTS}
                      className={styles.header__nav_link}
                      data-title="Мои посты"
                    >
                      <img src={PostsLogo} />
                    </NavLink>
                  </li>
                  <li className={styles.header__nav_item}>
                    <NavLink
                      to={BOOKMARKS}
                      className={styles.header__nav_link}
                      data-title="Закладки"
                    >
                      <img src={BookMarksLogo} />
                    </NavLink>
                  </li>
                </ul>
              </nav>
              <button className={styles.header__exit + " " + styles.header__nav_item} onClick={exit}>
                <img src={Exit} />
              </button>
            </>
          ) : null}
        </div>
      </header>
    </>
  );
};

export default HeaderView;
