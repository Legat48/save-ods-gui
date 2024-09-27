interface Header {
  key: string;
  name: string;
}

export const headersUser:Header[] = [
  { key: 'userName', name: 'Имя пользователя' },
  { key: 'name', name: 'IP пользователя' },
  { key: 'userDescr', name: 'Описание пользователя' },
  { key: 'totalCalls', name: 'Всего вызовов' },
  { key: 'totalMethod', name: 'Всего уникальных методов' },
  { key: 'methodString', name: 'Методы' },
  { key: 'totalInvalidCalls', name: 'Ошибок вызова' },
  { key: 'lastDate', name: 'Последний вызов' },
]