import { NavLink } from "react-router-dom";
import styles from "./Authorization.module.css";
import { REGISTRATION } from "../../navigation/routes";

const AuthorizationView = ({ handleSubmit }) => {
  return (
    <div>
      <div className={styles.auth}>
        <div className={styles.auth__block}>
          <form
            className={styles.auth__form}
            name="signIn"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className={styles.auth__logo}>Вход в личный кабинет</div>
            <div className={styles.row_block}>
              <label
                className={styles.row_block__label}
                htmlFor="signIn[login]"
              >
                Логин
              </label>
              <input
                className={styles.field}
                placeholder="Логин"
                form-not-empty="true"
                form-min-value="5"
                required
                autoComplete="true"
                type="text"
                name="signIn[login]"
              />
            </div>
            <div className={styles.row_block}>
              <label
                className={styles.row_block__label}
                htmlFor="signIn[password]"
              >
                Пароль
              </label>
              <input
                className={styles.field}
                form-not-empty="true"
                form-min-value="5"
                placeholder="Пароль"
                required
                autoComplete="true"
                type="password"
                name="signIn[password]"
              />
            </div>
            <div className={styles.auth__btns}>
              <button className={styles.button_confirm}>Войти</button>
            </div>
            <div className={styles.auth__sign_up}>
              <NavLink to={REGISTRATION}>Зарегистрироваться</NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthorizationView;
