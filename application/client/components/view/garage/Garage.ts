import Api from '../../utils/api';
import carsHTML from './content';
import State from '../../utils/state';
import Utils from '../../utils/utils';
import { CarType, EngineType } from '../../types';

type StateType = {
  [key: string]: number;
};

class Garage {
  static defaultInputColor = '#d1c7c7';

  static API: Api = new Api('http://localhost:3000');

  static utils: Utils = new Utils();

  static async renderHTML(): Promise<void> {
    const main = document.getElementById('main') as HTMLElement;
    const content = document.createElement('div') as HTMLDivElement;
    main.innerHTML = '';

    content.classList.add('container');
    content.innerHTML = carsHTML;
    main.append(content);
  }

  static async renderCars(page: number): Promise<void> {
    const carsContainer = document.querySelector('.cars') as HTMLElement;
    const carsAmount = document.querySelector('.cars-amount') as HTMLElement;
    const garagePageNum = document.querySelector('.garage-page-num') as HTMLElement;

    await Garage.API.getCars(page)
      .then((carsJSON) => {
        carsAmount.innerHTML = carsJSON.count.toString();
        garagePageNum.innerHTML = State.carsPageNum.toString();
        return carsJSON.items;
      })
      .then((carsItems) => {
        carsContainer.innerHTML = '';
        const arrayOfPromises: Promise<void>[] = carsItems.map((carData) => Garage.drawCar(carData, carsContainer));
        return Promise.all(arrayOfPromises);
      });
  }

  static async drawCar(carData: CarType, container: HTMLElement): Promise<void> {
    const carSvg = `
            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 511 511"  xml:space="preserve">
                <g>
                    <path fill="${carData.color.replace(
                      '#',
                      '%23'
                    )}" d="M160,307.5h133.538c14.182,0,27.524-7.554,34.82-19.715l14.501-24.169c2.273-3.789,1.045-8.703-2.744-10.976 c-3.788-2.273-8.702-1.045-10.976,2.744l-14.501,24.169c-4.421,7.369-12.507,11.947-21.101,11.947H160c-4.418,0-8,3.582-8,8 S155.582,307.5,160,307.5z"/>

                    <path fill="${carData.color.replace(
                      '#',
                      '%23'
                    )}" d="M504,323.569V299.5c0-48.523-39.477-88-88-88h-44.209c-12.392-9.747-62.874-48-91.791-48h-54 c-11.001,0-21.904,1.664-32.403,4.945c-0.204,0.063-0.404,0.135-0.602,0.215l-73.691,29.675 c-11.071,3.427-22.56,5.165-34.152,5.165H58.687c-0.379-0.778-0.884-1.51-1.53-2.157l-7.772-7.772 C57.969,189.897,64,181.368,64,171.455V163.5c0-4.418-3.582-8-8-8H8c-4.418,0-8,3.582-8,8v7.955 C0,184.713,10.787,195.5,24.045,195.5h4.642l8,8h-6.685C17.87,203.5,8,213.37,8,225.502V291.5c0,18.508,13.298,34.094,33.88,39.714 C51.989,345.87,68.888,355.5,88,355.5c15.22,0,29.034-6.112,39.138-16h249.723c10.104,9.888,23.918,16,39.138,16 s29.034-6.112,39.138-16H503c4.418,0,8-3.582,8-8C511,327.421,507.945,324.062,504,323.569z M16,171.5h32 c-0.024,4.416-3.624,8-8.045,8h-15.91C19.624,179.5,16.024,175.916,16,171.5z M356.287,219.763 c-3.571,2.505-6.227,5.165-8.059,7.339l-150.98-14.465C204.31,199.968,218.975,179.5,240,179.5h40 C298.891,179.5,336.321,204.724,356.287,219.763z M24,291.5v-65.998c0-3.31,2.692-6.002,6.002-6.002h55.15 c13.317,0,26.514-2.014,39.225-5.986c0.204-0.063,0.404-0.135,0.602-0.215l73.433-29.571c-1.999,2.142-3.953,4.431-5.85,6.899 c-9.799,12.756-14.805,25.43-15.014,25.963c-0.913,2.336-0.677,4.965,0.638,7.102c1.314,2.136,3.554,3.533,6.051,3.772l167,16 c0.28,0.027,0.559,0.041,0.835,0.041c2.931,0,5.573-1.5,6.942-4.153c0.559-0.939,7.435-11.851,24.986-11.851h32 c39.701,0,72,32.299,72,72v24h-21.414c3.467-7.279,5.414-15.415,5.414-24c0-30.878-25.122-56-56-56s-56,25.122-56,56 c0,8.585,1.947,16.721,5.414,24H138.586c3.467-7.279,5.414-15.415,5.414-24c0-30.878-25.122-56-56-56s-56,25.122-56,56 c0,3.313,0.306,6.554,0.86,9.711C27.217,304.609,24,298.428,24,291.5z M48,299.5c0-22.056,17.944-40,40-40s40,17.944,40,40 s-17.944,40-40,40S48,321.556,48,299.5z M416,339.5c-22.056,0-40-17.944-40-40s17.944-40,40-40s40,17.944,40,40 S438.056,339.5,416,339.5z"/>

                    <path fill="${carData.color.replace(
                      '#',
                      '%23'
                    )}" d="M112,291.5c-4.418,0-8,3.582-8,8c0,8.822-7.178,16-16,16s-16-7.178-16-16s7.178-16,16-16c4.418,0,8-3.582,8-8s-3.582-8-8-8 c-17.645,0-32,14.355-32,32s14.355,32,32,32s32-14.355,32-32C120,295.082,116.418,291.5,112,291.5z"/>

                    <path fill="${carData.color.replace(
                      '#',
                      '%23'
                    )}" d="M440,291.5c-4.418,0-8,3.582-8,8c0,8.822-7.178,16-16,16s-16-7.178-16-16s7.178-16,16-16c4.418,0,8-3.582,8-8s-3.582-8-8-8 c-17.645,0-32,14.355-32,32s14.355,32,32,32s32-14.355,32-32C448,295.082,444.418,291.5,440,291.5z"/>
                </g>
            </svg>
        `;
    const car = document.createElement('div') as HTMLDivElement;
    car.classList.add('car');
    car.dataset.id = `${carData.id}`;
    car.innerHTML = `
            <div class="car-manage">
                <button class="select-car">Select</button>
                <button class="remove-car">Remove</button>
                <span class="car-name">${carData.name}</span>
            </div>
            <div class="car-move">
                <button class="start-car">A</button>
                <button class="stop-car" disabled>B</button>
                <div class="car-model">
                    <img class="car-image" src='data:image/svg+xml;utf8,${carSvg}'>
                </div>
                <span class="finish-flag"></span>
            </div>
        `;

    container.append(car);
    (document.querySelector('.create-name') as HTMLInputElement).value = '';
    (document.querySelector('.create-color') as HTMLInputElement).value = Garage.defaultInputColor;
  }

  static async getGarageJSON(garageURL: string): Promise<CarType[]> {
    const response = await fetch(garageURL);
    return response.json();
  }

  static async createCar(): Promise<void> {
    const createFormName = (document.querySelector('.create-name') as HTMLInputElement).value;
    const createFormColor = (document.querySelector('.create-color') as HTMLInputElement).value;

    if (createFormName && createFormColor) {
      const body = {
        name: createFormName,
        color: createFormColor,
      };
      Garage.API.createCar(body)
        .then(() => Garage.renderCars(State.carsPageNum))
        .then(() => Garage.utils.switchCarsPaginationButtons());
    }
  }

  // eslint-disable-next-line consistent-return
  static async carsListener(e: Event): Promise<void> {
    const removeBtnPressed = (e.target as HTMLElement).classList.contains('remove-car');
    const selectBtnPressed = (e.target as HTMLElement).classList.contains('select-car');
    const startBtnPressed = (e.target as HTMLElement).classList.contains('start-car');
    const parentCar = (e.target as HTMLElement).parentElement.parentElement;
    const carId = +parentCar.dataset.id;
    const updateNameInput = document.querySelector('.update-name') as HTMLInputElement;
    const updateColorInput = document.querySelector('.update-color') as HTMLInputElement;
    const updateBtn = document.querySelector('.update') as HTMLButtonElement;

    const parentCarModel = parentCar.querySelector('.car-model') as HTMLElement;
    const finishFlag = parentCar.querySelector('.finish-flag') as HTMLElement;
    const startBtn = parentCar.querySelector('.start-car') as HTMLButtonElement;
    const stopBtn = parentCar.querySelector('.stop-car') as HTMLButtonElement;
    const carLeftDefault: number = Garage.utils.getCoords(parentCarModel).left;
    const flagRightDefault: number = Garage.utils.getCoords(finishFlag).right;
    const carWidth: number = Garage.utils.getCoords(parentCarModel).width;
    const UiDistance = flagRightDefault - carLeftDefault;

    function getCarDataByID(data: CarType[], id: number): CarType | undefined {
      const currentCarData: CarType | undefined = data.find((carData) => carData.id === id);
      return currentCarData;
    }

    function enableUpdateForm(data: CarType[], id: number) {
      const currentCarData = getCarDataByID(data, id);
      updateNameInput.disabled = false;
      updateColorInput.disabled = false;
      updateBtn.disabled = false;
      updateNameInput.value = currentCarData.name;
      updateColorInput.value = currentCarData.color;
    }

    function disableUpdateForm() {
      const body = { name: updateNameInput.value, color: updateColorInput.value };
      Garage.API.updateCar(carId, body).then(() => Garage.renderCars(State.carsPageNum));

      updateNameInput.disabled = true;
      updateColorInput.disabled = true;
      updateBtn.disabled = true;
      updateBtn.removeEventListener('click', disableUpdateForm);
      setTimeout(() => {
        updateNameInput.value = '';
        updateColorInput.value = Garage.defaultInputColor;
      }, 0);
    }

    function startCarAnimation(moveData: EngineType): StateType {
      const duration = moveData.distance / moveData.velocity;
      let start: null | number = null;
      let state: StateType = { animID: 0 };

      function animation(timestamp: number) {
        startBtn.disabled = true;
        stopBtn.disabled = false;
        if (!start) {
          start = timestamp;
        }
        let timeFraction: number = (timestamp - start) / duration;
        if (timeFraction > 1) {
          timeFraction = 1;
        }

        const progress: number = carWidth + timeFraction * UiDistance;
        parentCarModel.style.left = `${progress}px`;
        if (parseFloat(parentCarModel.style.left) < carWidth + UiDistance) {
          state.animID = requestAnimationFrame(animation);
        }
      }

      // TODO - have a look if trouble will be there
      state = { animID: requestAnimationFrame(animation) };
      return state;
    }

    async function removeCarFromEverywhere(id: number) {
      Garage.API.deleteCar(id)
        .then(() => Garage.API.getWinner(id))
        .then((winnerData) => {
          if (winnerData.id) {
            // TODO - have a look if trouble will be there
            Garage.API.deleteWinner(winnerData.id);
          }
        })
        .finally(() => {
          Garage.renderCars(State.carsPageNum).then(() => Garage.utils.switchCarsPaginationButtons());
        });
    }

    async function stopCar(state: StateType, id: number): Promise<void> {
      cancelAnimationFrame(state.animID);
      Garage.API.stopEngine(id);
    }

    async function returnCarToDefaultPosition(state: StateType, id: number): Promise<void> {
      stopCar(state, id).then(() => {
        parentCarModel.style.left = '80px';
        startBtn.disabled = false;
        stopBtn.disabled = true;
      });
    }

    async function runStartButton(id: number) {
      await Garage.API.startEngine(id)
        .then((moveData) => startCarAnimation(moveData))
        .then((state) => {
          stopBtn.addEventListener('click', () => {
            returnCarToDefaultPosition(state, id);
          });

          Garage.API.switchDriveMode(id).then((response) => {
            if (!response.success) {
              stopCar(state, id);
            }
          });
        })
        .catch((event: Event) => console.log(event));
    }

    if (removeBtnPressed) {
      await removeCarFromEverywhere(carId);
    }

    if (selectBtnPressed) {
      return new Promise((resolve, reject) => {
        resolve(
          Garage.getGarageJSON(Garage.API.garage).then((carData) => {
            enableUpdateForm(carData, carId);
            updateBtn.addEventListener('click', disableUpdateForm);
          })
        );

        reject(new Error("Couldn't getGarageJSON or (dis/en)ableUpdateForm"));
      });
    }

    if (startBtnPressed) {
      await runStartButton(carId);
    }
  }

  static async generateRandomCars(): Promise<void> {
    await Garage.utils
      .generate100Cars()
      .then(() => Garage.renderCars(State.carsPageNum))
      .then(() => Garage.utils.switchCarsPaginationButtons());
  }

  static async addListeners(): Promise<void> {
    const cars = document.querySelector('.cars') as HTMLElement;
    const createBtn = document.querySelector('.create') as HTMLElement;
    const generateBtn = document.querySelector('.generate') as HTMLElement;

    cars.addEventListener('click', (e) => Garage.carsListener(e));
    createBtn.addEventListener('click', Garage.createCar);
    generateBtn.addEventListener('click', Garage.generateRandomCars);
  }

  async carsPaginationListener(): Promise<void> {
    const prevCarsBtn = document.querySelector('.prev-cars-page') as HTMLButtonElement;
    const nextCarsBtn = document.querySelector('.next-cars-page') as HTMLButtonElement;

    prevCarsBtn.addEventListener('click', () => {
      if (prevCarsBtn && !prevCarsBtn.disabled) {
        State.carsPageNum = +State.carsPageNum - 1;
        Garage.renderCars(State.carsPageNum).then(() => Garage.utils.switchCarsPaginationButtons());
      }
    });

    nextCarsBtn.addEventListener('click', () => {
      if (nextCarsBtn && !nextCarsBtn.disabled) {
        State.carsPageNum = +State.carsPageNum + 1;
        Garage.renderCars(State.carsPageNum).then(() => Garage.utils.switchCarsPaginationButtons());
      }
      if (State.carsPageNum === 1) {
        prevCarsBtn.disabled = true;
      } else {
        prevCarsBtn.disabled = false;
      }
    });
  }

  async changePageNum(): Promise<void> {
    const carsContainer = document.querySelector('.cars') as HTMLElement;

    if (carsContainer) {
      await Garage.utils.switchCarsPaginationButtons().then(() => {
        this.carsPaginationListener();
      });
    }
  }

  async run(): Promise<void> {
    await Garage.renderHTML()
      .then(() => Garage.renderCars(State.carsPageNum))
      .then(() => Garage.addListeners())
      .then(() => this.changePageNum());
  }
}

export default Garage;
