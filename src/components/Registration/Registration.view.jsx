import { NavLink } from "react-router-dom";
import styles from "./Registration.module.css";
import { AUTHORIZATION } from "../../navigation/routes";
import MaskedInput from "react-input-mask";

const RegistrationView = ({ handleSubmit }) => {
  return (
    <div>
      <div className={styles.auth}>
        <div className={styles.auth__block}>
          <form
            className={styles.auth__form}
            name="registration"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className={styles.auth__logo}>Регистрация</div>
            <div className={styles.row_block}>
              <label
                className={styles.row_block__label}
                htmlFor="registration[login]"
              >
                Логин
              </label>
              <input
                placeholder="Логин"
                className={styles.field}
                form-not-empty="true"
                form-min-value="5"
                required
                autoComplete="true"
                type="text"
                name="registration[login]"
              />
            </div>
            <div className={styles.row_block}>
              <label
                className={styles.row_block__label}
                htmlFor="registration[password]"
              >
                Пароль
              </label>
              <input
                className={styles.field}
                placeholder="Пароль"
                form-not-empty="true"
                form-min-value="5"
                required
                autoComplete="true"
                type="password"
                name="registration[password]"
              />
            </div>
            <div className={styles.row_block}>
              <label
                className={styles.row_block__label}
                htmlFor="registration[name]"
              >
                Никнейм
              </label>
              <input
                placeholder="Никнейм"
                className={styles.field}
                form-not-empty="true"
                required
                autoComplete="true"
                type="text"
                name="registration[name]"
              />
            </div>
            <div className={styles.row_block}>
              <label
                className={styles.row_block__label}
                htmlFor="registration[bank]"
              >
                Реквизиты
              </label>
              <MaskedInput
                mask="9999 9999 9999 9999"
                className={styles.field + " " + styles.masked_input}
                placeholder="Введите номер карты"
                name="registration[bank]"
              />
            </div>
            <div className={styles.row_block}>
              <label
                className={styles.row_block__label}
                htmlFor="registration[data]"
              >
                О себе
              </label>
              <textarea
                className={styles.field_text_area}
                placeholder="Информация о себе"
                form-not-empty="true"
                form-min-value="5"
                required
                autoComplete="true"
                name="registration[data]"
              />
            </div>
            <div className={styles.auth__btns}>
              <button className={styles.button_confirm}>
                Зарегистрироваться
              </button>
            </div>
            <div className={styles.auth__sign_in}>
              <NavLink to={AUTHORIZATION}>Авторизоваться</NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationView;
