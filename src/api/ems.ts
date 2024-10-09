
import { apiUrl } from './index'


class EmsApi {
  async getArr() {
    const head: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'getEmsTechKey',
        id: 2,
        params: {
          timestamp: 0,
        },
      }),
    };

    try {
      const response = await fetch(`${apiUrl}DataHub/DataHubSrv`, head);
      const responseData = await response.json();
      return responseData
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default new EmsApi();