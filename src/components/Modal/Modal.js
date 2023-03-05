import React from 'react';
import css from './Modal.module.css';

export const Modal = ({ src, tags, onClick }) => {
  return (
    <div className={css.overlay} onClick={onClick}>
      <div className={css.modal}>
        <img src={src} alt={tags} />
      </div>
    </div>
  );
};
