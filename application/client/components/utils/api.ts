import { BodyType, CarType, WinnerType, GetCarsType, GetWinnersType, EngineType } from '../types';

class Api {
  server: string;

  garage: string;

  winners: string;

  engine: string;

  constructor(serverURL: string) {
    this.server = serverURL;
    this.garage = `${this.server}/garage`;
    this.winners = `${this.server}/winners`;
    this.engine = `${this.server}/engine`;
  }

  async getCars(page: number, limit = 7): Promise<GetCarsType> {
    const response: Response = await fetch(`${this.garage}?_page=${page}&_limit=${limit}`);
    return {
      items: await response.json(),
      count: response.headers.get('X-Total-Count'),
    };
  }

  async getCar(id: number): Promise<CarType> {
    return (await fetch(`${this.garage}/${id}`)).json();
  }

  async createCar(body: BodyType): Promise<CarType> {
    return (
      await fetch(this.garage, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
    ).json();
  }

  async deleteCar(id: number): Promise<unknown> {
    return (
      await fetch(`${this.garage}/${id}`, {
        method: 'DELETE',
      })
    ).json();
  }

  async updateCar(id: number, body: BodyType): Promise<JSON> {
    return (
      await fetch(`${this.garage}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
    ).json();
  }

  async startEngine(id: number): Promise<EngineType> {
    return (await fetch(`${this.engine}?id=${id}&status=started`, { method: 'PATCH' })).json();
  }

  async stopEngine(id: number): Promise<EngineType> {
    return (await fetch(`${this.engine}?id=${id}&status=stopped`, { method: 'PATCH' })).json();
  }

  async switchDriveMode(id: number) {
    const response = await fetch(`${this.engine}?id=${id}&status=drive`, { method: 'PATCH' });
    return response.status === 200 ? response.json() : { success: false };
  }

  async getWinners(page: number, limit = 10, sort?: string, order?: string): Promise<GetWinnersType> {
    const response: Response = await fetch(
      `${this.winners}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`
    );
    return {
      items: await response.json(),
      count: response.headers.get('X-Total-Count'),
    };
  }

  async getWinner(id: number): Promise<WinnerType> {
    return (await fetch(`${this.winners}/${id}`)).json();
  }

  async createWinner(body: BodyType): Promise<JSON> {
    return (
      await fetch(this.winners, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
    ).json();
  }

  async deleteWinner(id: number): Promise<unknown> {
    return (
      await fetch(`${this.winners}/${id}`, {
        method: 'DELETE',
      })
    ).json();
  }

  async updateWinner(id: number, body: BodyType): Promise<JSON> {
    return (
      await fetch(`${this.winners}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
    ).json();
  }
}

export default Api;
