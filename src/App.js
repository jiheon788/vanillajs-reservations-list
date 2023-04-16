import api from './api/reservations.js';
import ReservationList from './components/ReservationList.js';

class App {
  constructor($app) {
    this.$app = $app;
    this.wrapper = document.createElement('div');
    this.wrapper.className = 'wrapper';
    $app.appendChild(this.wrapper);
    this.render();
  }
  async render() {
    let response = null;
    response = await api.fetchReservations();

    new ReservationList(this.wrapper, response.reservations);
  }
}

export default App;
