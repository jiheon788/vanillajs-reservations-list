import api from './api/reservations.js';
import ReservationList from './components/ReservationList.js';

class App {
  constructor($app) {
    this.$app = $app;
    this.render();
  }
  async render() {
    let response = null;
    response = await api.fetchReservations();
    console.log('response');
    console.log(response);

    new ReservationList(this.$app, response);
  }
}

export default App;
