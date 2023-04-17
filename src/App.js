import api from './api/reservations.js';
import ReservationList from './components/ReservationList.js';

class App {
  constructor($app) {
    this.$app = $app;
    this.wrapper = document.createElement('div');
    this.wrapper.className = 'wrapper';
    this.wrapper.innerHTML = `<h1>예약 목록</h1>`;

    this.container = document.createElement('div');
    this.container.className = 'container';
    this.wrapper.appendChild(this.container);
    $app.appendChild(this.wrapper);
    this.render();
  }
  async render() {
    let response = null;
    response = await api.fetchReservations();

    new ReservationList(this.container, response.reservations);
  }
}

export default App;
