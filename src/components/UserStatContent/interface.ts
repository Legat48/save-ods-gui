

export interface User {
  user_ip: string;
  user_name: string;
  user_descr: string;
}



export interface Info {
  [key: string]: any;
}

// ----------------------------------------------------------------
// 1 пользователь в массиве пользователей, собранные данные по пользователю
export interface CalledMethod {
  method_name: string,
  last_ts: number,
  calls_hour_0: number,
  calls_hour_1: number,
  calls_hour_2: number,
  calls_hour_3: number,
  calls_hour_4: number,
  calls_hour_5: number,
  calls_hour_6: number,
  calls_hour_7: number,
  calls_hour_8: number,
  calls_hour_9: number,
  calls_hour_10: number,
  calls_hour_11: number,
  calls_hour_12: number,
  calls_hour_13: number,
  calls_hour_14: number,
  calls_hour_15: number,
  calls_hour_16: number,
  calls_hour_17: number,
  calls_hour_18: number,
  calls_hour_19: number,
  calls_hour_20: number,
  calls_hour_21: number,
  calls_hour_22: number,
  calls_hour_23: number
}

export interface ValueUser {
  last_ts: number,
  total_invalid_calls: number,
  called_methods: CalledMethod[];
}
export interface OptionUser {
  id: number;
  name: string;
  userName: string;
  userDescr: string;
  valueUser: ValueUser;
}

// ----------------------------------------------------------------

export interface StatData {
  [key: string]: {
    called_methods: any[];
    total_invalid_calls?: number;
  };
}


export interface LabelItem {
  title: string;
  value: string | number;
  maxWidth: number;
}

export interface StatLabelProps {
  labelArr: LabelItem[];
  setIsCurrentStats: any;
  isCurrentStats: any;
}

// ----------------------------------------------------------------
// интерфейс для таблицы по пользователям

export interface TableItem {
  userName: string, // Имя пользователя
  name: string, // IP пользователя
  userDescr: string, // Описание пользователя
  totalCalls: string, // Всего вызовов
  totalMethod: number, // Всего уникальных методов
  methodString: string, // Методы
  totalInvalidCalls: number, // Ошибок вызова
  lastDate: string, // Последний вызов
}