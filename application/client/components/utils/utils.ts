import Api from './api';
import State from './state';
import brands from '../../assets/db/brands';
import models from '../../assets/db/models';
import { BodyType, CarType } from '../types';

class Utils {
  static API: Api = new Api('http://localhost:3000');

  async switchCarsPaginationButtons(): Promise<void> {
    const prevCarsBtn = document.querySelector('.prev-cars-page') as HTMLButtonElement;
    const nextCarsBtn = document.querySelector('.next-cars-page') as HTMLButtonElement;

    Utils.API.getCars(+State.carsPageNum + 1).then((nextCarsJSON) => {
      if (nextCarsJSON.items.length > 0) {
        nextCarsBtn.disabled = false;
      } else {
        nextCarsBtn.disabled = true;
      }
      if (State.carsPageNum === 1) {
        prevCarsBtn.disabled = true;
      }
    });
  }

  async switchWinnersPaginationButtons(): Promise<void> {
    const prevWinnersBtn = document.querySelector('.prev-winners-page') as HTMLButtonElement;
    const nextWinnersBtn = document.querySelector('.next-winners-page') as HTMLButtonElement;

    Utils.API.getWinners(+State.winnersPageNum + 1).then((nextWinnersJSON) => {
      if (nextWinnersJSON.items.length > 0) {
        nextWinnersBtn.disabled = false;
      } else {
        nextWinnersBtn.disabled = true;
      }
      if (State.winnersPageNum === 1) {
        prevWinnersBtn.disabled = true;
      }
    });
  }

  async getRandomCarBody(): Promise<BodyType> {
    return {
      name: `${brands[this.getRandomInt(50)]} ${models[this.getRandomInt(50)]}`,
      color: `#${this.getRandomColor()}`,
    };
  }

  async generateCar(): Promise<CarType> {
    const body = await this.getRandomCarBody();
    return Utils.API.createCar(body);
  }

  async generate100Cars(): Promise<void> {
    let i = 100;
    while (i > 0) {
      i -= 1;
      this.generateCar();
    }
  }

  getCoords(elem: HTMLElement) {
    const domRect = elem.getBoundingClientRect();
    return {
      left: domRect.left + window.scrollY,
      right: domRect.right + window.scrollY,
      top: domRect.top + window.scrollX,
      bottom: domRect.bottom + window.scrollY,
      width: domRect.right + window.scrollY - (domRect.left + window.scrollY),
      height: domRect.bottom + window.scrollY - (domRect.top + window.scrollX),
    };
  }

  getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }

  getRandomColor(): string {
    const allowed = 'ABCDEF0123456789';
    let S = '';

    while (S.length < 6) {
      S += allowed.charAt(this.getRandomInt(15));
    }
    return S.toLowerCase();
  }
}

export default Utils;
