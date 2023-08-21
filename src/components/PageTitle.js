import React from 'react';
import style from '../styles/modules/title.module.scss';

function PageTitle({ children, ...props }) {
  return (
    <p className={style.title} {...props}>
      {children}
    </p>
  );
}

export default PageTitle;
