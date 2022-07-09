import '../../styles/scss/styles.scss';
import Api from '../utils/api';
import State from '../utils/state';
import Garage from '../view/garage/Garage';
import Winners from '../view/winners/Winners';
import Utils from '../utils/utils';

class App {
  garage: Garage;

  winners: Winners;

  utils: Utils;

  static API: Api = new Api('http://localhost:3000');

  constructor() {
    this.garage = new Garage();
    this.winners = new Winners();
    this.utils = new Utils();
  }

  async changeView(id: string): Promise<void> {
    if (id === 'garage' && State.viewPage !== 'garage') {
      await this.garage.run().then(() => {
        State.viewPage = id;
      });
    }
    if (id === 'winners' && State.viewPage !== 'winners') {
      await this.winners.run().then(() => {
        State.viewPage = id;
      });
    }
  }

  async changeViewListener(): Promise<void> {
    const garageBtn = document.querySelector('.to-garage');
    const winnersBtn = document.querySelector('.to-winners');

    garageBtn.addEventListener('click', (e) => {
      const { id } = (e.target as HTMLElement).dataset;
      this.changeView(id);
    });

    winnersBtn.addEventListener('click', (e) => {
      const { id } = (e.target as HTMLElement).dataset;
      this.changeView(id);
    });
  }

  async run(): Promise<void> {
    await this.garage.run().then(() => this.changeViewListener());
  }
}

export default App;
