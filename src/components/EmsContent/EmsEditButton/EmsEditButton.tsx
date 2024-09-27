import React from 'react';

interface EmsEditButtonProps {
  copyObg: any | null;
  edit: boolean;
  onSubmit: () => void;
}

export const EmsEditButton: React.FC<EmsEditButtonProps> = ({ copyObg, edit, onSubmit }) => {
  return (
    <button
      className={`card-ems__item-btn card-ems__item-btn_submit card-ems__item-btn_mla btn
        ${!!copyObg ? 'card-ems__item-btn_hidden' : ''}
       ${edit ? 'card-ems__item-btn_ok' : ''}`}
      onClick={onSubmit}
    >
      {!edit ? (
        <svg fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6.27905 20.25V24H10.0291L21.0891 12.94L17.3391 9.19L6.27905 20.25ZM23.989 10.04C24.3791 9.65 24.3791 9.02 23.989 8.63L21.6491 6.29C21.2591 5.9 20.6291 5.9 20.2391 6.29L18.4091 8.12L22.1591 11.87L23.989 10.04Z"
            fill="white"
          />
        </svg>
      ) : (
        <svg
          className="card-ems__submit-svg"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          width="17.599998"
          height="13.400024"
          viewBox="0 0 17.6 13.4"
        >
          <path
            id="Vector"
            d="M5.6 10.6L1.4 6.4L0 7.79L5.6 13.4L17.6 1.4L16.2 0L5.6 10.6Z"
            fill="#fff"
            fillOpacity="1.000000"
            fillRule="nonzero"
          />
        </svg>
      )}
    </button>
  );
};