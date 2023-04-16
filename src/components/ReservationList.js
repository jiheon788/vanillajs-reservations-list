import { Status } from '../constants/UI.js';
import ReservationDetail from './ReservationDetail.js';

export default class ReservationList {
  constructor($wrapper, data) {
    this.$wrapper = $wrapper;
    this.reservationsData = data;
    this.focusedIndex = 0;
    this.render();
  }

  render() {
    this.$wrapper.innerHTML = '';

    const reservations = document.createElement('div');
    reservations.className = 'reservations-list';

    if (this.reservationsData) {
      this.reservationsData.map((reservation, index) => {
        const item = document.createElement('div');
        item.className = 'reservations-list__item';

        item.addEventListener('click', (e) => {
          this.focusedIndex = index;
          this.render();
        });

        const itemLeftInfo = document.createElement('div');
        const timeReserved = document.createElement('div');
        const status = document.createElement('div');
        timeReserved.innerText = reservation.timeReserved;
        status.innerText = Status[reservation.status];
        status.className = `reservations-list__item__status--${reservation.status}`;

        itemLeftInfo.appendChild(timeReserved);
        itemLeftInfo.appendChild(status);

        const itemMiddleInfo = document.createElement('div');
        const customerInfo = document.createElement('div');
        const customers = document.createElement('div');
        const menus = document.createElement('div');
        customerInfo.innerText = `${reservation.customer.name}-[ ${[
          ...reservation.tables.map((table) => table.name),
        ]} ]`;
        customers.innerText = `성인 ${reservation.customer.adult} 아이 ${reservation.customer.child}`;
        menus.innerText = `[ ${[
          ...reservation.menus.map((menu) => `${menu.name} (${menu.qty})`),
        ]} ]`;
        customerInfo.className = 'reservations-list__item__customerInfo';
        menus.className = 'reservations-list__item__menus';

        itemMiddleInfo.appendChild(customerInfo);
        itemMiddleInfo.appendChild(customers);
        itemMiddleInfo.appendChild(menus);

        const itemRightInfo = document.createElement('div');

        const button = document.createElement('button');
        if (reservation.status === 'reserved') {
          button.innerText = `착석`;
        }
        if (reservation.status === 'seated') {
          button.innerText = `퇴석`;
        }

        button.addEventListener('click', (e) => {
          if (reservation.status === 'reserved') {
            this.reservationsData[index].status = 'seated';
          } else if (reservation.status === 'seated') {
            this.reservationsData[index].status = 'done';
          }
          this.render();
        });

        itemRightInfo.appendChild(button);

        item.appendChild(itemLeftInfo);
        item.appendChild(itemMiddleInfo);
        item.appendChild(itemRightInfo);

        if (reservation.status !== 'done') {
          reservations.appendChild(item);
        }
      });
    }
    this.$wrapper.appendChild(reservations);

    new ReservationDetail(
      this.$wrapper,
      this.reservationsData[this.focusedIndex],
    );
  }
}
