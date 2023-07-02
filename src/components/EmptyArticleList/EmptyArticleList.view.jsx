import React from 'react';
import style from "./EmptyArticleList.module.css";

const EmptyArticleList = () => {
  return (
    <div className={style.centered_text}>
      <h1>Статей нет</h1>
    </div>
  );
};

export default EmptyArticleList;