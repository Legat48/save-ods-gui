import { apiUrl } from './index'

export async function useGetStatus(timestamp : string) {
  const response = await fetch(`${apiUrl}DataHub/DataHubSrv`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      method: 'GetEQStatus',
      id: 3,
      params: {
        timestamp: Number(timestamp),
      },
    }),
  });
  if (!response.ok) {
    throw new Error('Request failed with status code ' + response.status);
  }
  const responseData = await response.json();
  return responseData;
};
// Универсальный метод получения данных с датахаб
export async function getUniversal(methodName: string, paramArr: any[]): Promise<any> {
  const params: Record<string, any> = {}; // Используем тип `Record<string, any>` для `params`
  for (const item of paramArr) {
    params[item.key] = item.value; // Убираем кавычки вокруг `${item.key}`
  }
  const head: RequestInit = {
    method: 'post',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      method: `${methodName}`,
      id: 3,
      params
    })
  }
  try {
    const response = await fetch(`${apiUrl}DataHub/DataHubSrv`, head)
    const responseData = await response.json()
    return responseData
  } catch (error) {
    console.error(error)
    return error
  }
}