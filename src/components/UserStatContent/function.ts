import { numberFormat } from '../../utils/numberFormat';
import { LabelItem, Info, User, OptionUser, StatData, TableItem } from './interface';

export function setOptionsUser(info: Info, users: User[]): OptionUser[] {

  const userMap = new Map(users.map(user => [user.user_ip, user]));

  return Object.entries(info).map(([key, value], index) => ({
    id: index,
    name: key,
    userName: userMap.get(key)?.user_name || '',
    userDescr: userMap.get(key)?.user_descr || '',
    valueUser: value
  }));
}

export function setStat(data: StatData): LabelItem[] {
  let totalInvalidCalls = 0;
  let totalCalls = 0;
  const methodSet = new Set<string>();

  for (const { called_methods, total_invalid_calls } of Object.values(data)) {
    if (total_invalid_calls) {
      totalInvalidCalls += total_invalid_calls;
    }

    called_methods.forEach(method => {
      for (const [itemKeys, itemValue] of Object.entries(method)) {
        if (itemKeys.includes('call') && itemValue && typeof itemValue === 'number') {
          totalCalls += itemValue;
        }
      }
      if (method.method_name) {
        methodSet.add(method.method_name);
      }
      if (typeof method.call === 'number') {
        totalCalls += method.call;
      }
    });
  }

  return [
    {
      title: 'Всего пользователей',
      maxWidth: 170,
      value: Object.keys(data).length,
    },
    {
      title: 'Всего вызовов',
      maxWidth: 170,
      value: numberFormat(totalCalls),
    },
    {
      title: 'Всего ошибок вызова',
      maxWidth: 170,
      value: totalInvalidCalls,
    },
    {
      title: 'Всего уникальных методов',
      maxWidth: 170,
      value: methodSet.size,
    },
    {
      title: 'Методы',
      maxWidth: 900,
      value: Array.from(methodSet).join(' | '),
    },
  ];
}

export function createTableRow(user: OptionUser): TableItem {
  let totalCalls = 0;
  let totalMethod = 0;
  const methodArr: string[] = [];
  user.valueUser.called_methods.forEach((e) => {
    for (const [itemKeys, itemValue] of Object.entries(e)) {
      if (itemKeys.includes('call') && itemValue) {
        totalCalls += itemValue;
      } else if (itemKeys === 'method_name' && !methodArr.includes(itemValue)) {
        totalMethod++;
        methodArr.push(itemValue);
      }
    }
  });

  let methodString = '';
  methodArr.forEach((e) => {
    methodString = `${methodString} ${e}`;
  });
  let lastDate = ''
  if(user.valueUser.last_ts) {
    const date = new Date(user.valueUser.last_ts)
    lastDate = `в ${date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })}`
  }

  return {
    userName: user.userName, // Имя пользователя
    name: user.name, // IP пользователя
    userDescr: user.userDescr, // Описание пользователя
    totalCalls: numberFormat(totalCalls), // Всего вызовов
    totalMethod: totalMethod, // Всего уникальных методов
    methodString: methodString, // Методы
    totalInvalidCalls: user.valueUser.total_invalid_calls, // Ошибок вызова
    lastDate: lastDate, // Последний вызов
  }
}

