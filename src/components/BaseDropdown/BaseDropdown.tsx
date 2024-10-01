import  { FC, useState } from 'react';
import { useSelector } from 'react-redux';

interface BaseDropdownProps {
  methodName?: string;
  json: any;
  colorType?: number;
  title: string | number;
  value?: string | number | object | boolean | Array<any> | null;
  drop?: boolean;
  scheme?: { [key: string]: string };
  keyTitle?: string;
}

export const BaseDropdown: FC<BaseDropdownProps> = ({
  methodName,
  json,
  colorType = 1,
  title,
  value,
  drop = false,
  keyTitle = '',
}) => {
  const [open, setOpen] = useState(true);
  const scheme = useSelector((state: any) => {
    if (methodName) {
      const methodKey = methodName.toUpperCase();
      return state.dataHubShema.scheme[methodKey]?.jsonTitle || {};
    }
    return {};
  });
  const handleClick = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const funcKeyTitle = (keyTitle: any, key: any) => {
    const oldKey = keyTitle ? `${keyTitle}_${key}` : key
    // console.log(oldKey)
    return oldKey
  }

  const infoKeyName = (key: string) => {
    // Implement your own logic for getting the info key name
    return key.toLowerCase();
  };

  return (
    <div className="dropdown">
      <button
        className={`dropdown__btn btn ${
          !drop ? 'dropdown__btn_disabled' : `dropdown__btn_color-border-${colorType}`
        }`}
        onClick={handleClick}
      >
        {drop && (
          <svg
            className={`dropdown__icon ${open ? 'dropdown__icon_open' : ''}`}
            width="12"
            height="7.41003"
            viewBox="0 0 12 7.41003"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <path
              id="Vector"
              d="M1.40991 7.41003L6 2.82996L10.5901 7.41003L12 6L6 0L0 6L1.40991 7.41003Z"
              fill="#323232"
              fillOpacity="1.000000"
              fillRule="nonzero"
            />
          </svg>
        )}
        <span className="dropdown__btn-text dropdown__btn-text_bold">{`${title}: `}</span>
                {typeof value !== 'object' && <span className="dropdown__btn-text">{value}</span>}
        {/* {methodName && !!scheme && scheme[`${keyTitle}` || scheme[`${title}`]] && (
          <div className="dropdown__text">{scheme[`${keyTitle}`] || scheme[`${title}`]}</div>
        )} */}
        {methodName && !!scheme && (
        <div className="dropdown__text">
          {scheme[`${keyTitle}`] || scheme[`${title}`]}
        </div>
      )}
        {methodName && !!scheme && scheme[`${value}`.toLowerCase()] && (
          <div className="dropdown__text">{scheme[`${value}`.toLowerCase()]}</div>
        )}
      </button>
      {open  && json && Array.isArray(json) && (
        <>
          {json.map((item, index) => (
            <BaseDropdown
              key={index}
              methodName={methodName}
              colorType={colorType + 1}
              drop={true}
              json={item || {}}
              keyTitle={`${keyTitle}`}
              title={`Index ${index}`}
            />
          ))}
        </>
      )}
      {open && json && typeof json === 'object' && !Array.isArray(json) && (
        <>
          {Object.entries(json).map(([key, item]) => (
            <BaseDropdown
              key={key}
              colorType={colorType + 1}
              methodName={methodName}
              json={item || {}}
              title={key}
              keyTitle={`${funcKeyTitle(keyTitle, key)}`}
              drop={Array.isArray(item) || typeof item === 'object'}
              value={Array.isArray(item) ? `Array length: ${item.length}` : typeof item === 'object' && item !== null ? item : String(item)}
            />
          ))}
        </>
      )}
    </div>
  );
};