import { STATUS } from '../constants/UI.js';
import { isMobile, timeFormatter } from '../utils/UIHelper.js';
import { onOpen } from '../utils/modalHelper.js';
import ReservationDetail from './ReservationDetail.js';

export default class ReservationList {
  constructor($containter, data) {
    this.$containter = $containter;
    this.reservationsData = data;
    this.focusedIndex = 0;
    this.render();
  }

  render() {
    this.$containter.innerHTML = '';
    const reservations = document.createElement('div');
    reservations.className = 'reservations-list';

    if (this.reservationsData) {
      this.reservationsData.forEach((reservation, index) => {
        if (reservation.status !== 'done') {
          const item = document.createElement('div');
          item.className = 'reservations-list__item';

          item.innerHTML = `
        <div>
          <div>${timeFormatter(reservation.timeReserved)}</div>
          <div class="reservation__status--${reservation.status}">
            ${STATUS[reservation.status]}
          </div>
        </div>
        <div>
          <div class="reservations-list__item__customerInfo">
          ${reservation.customer.name}-[ ${[
            ...reservation.tables.map((table) => table.name),
          ]} ]
          </div>
          <div>
            성인 ${reservation.customer.adult} 아이 ${
            reservation.customer.child
          }
          </div>
          <div class="reservations-list__item__menus">
            [ ${[
              ...reservation.menus.map((menu) => `${menu.name} (${menu.qty})`),
            ]} ]
          </div>
        </div>
        <button type="button" class="reservations-list__button" data-index="${index}" data-status="${
            reservation.status
          }">
          ${reservation.status === 'reserved' ? '착석' : '퇴석'}
        </button>
      `;

          item.addEventListener('click', (e) => {
            this.focusedIndex = index;
            this.render();
            if (isMobile()) onOpen();
          });

          reservations.appendChild(item);

          const statusButton = item.querySelector('.reservations-list__button');

          statusButton.addEventListener('click', (e) => {
            e.stopPropagation();
            const index = e.target.dataset.index;
            const status = e.target.dataset.status;

            if (status === 'reserved') {
              this.reservationsData[index].status = 'seated';
            } else if (status === 'seated') {
              this.reservationsData[index].status = 'done';
            }

            this.render();
          });
        }
      });
    }
    this.$containter.appendChild(reservations);

    new ReservationDetail(
      this.$containter,
      this.reservationsData[this.focusedIndex],
    );
  }
}
