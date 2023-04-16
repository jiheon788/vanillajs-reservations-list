import ReservationDetail from './ReservationDetail.js';

export default class ReservationList {
  constructor($app, data) {
    this.section = document.createElement('section');
    this.section.className = 'reservation-list';
    this.reservations = data.reservations;
    this.focusedIndex = 0;
    $app.appendChild(this.section);
    this.render();
    console.log(this.reservations);
  }

  render() {
    this.section.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.className = 'wrapper';

    const reservations = document.createElement('div');
    reservations.className = 'reservations-list';

    if (this.reservations) {
      this.reservations.map((reservation, index) => {
        const item = document.createElement('div');
        item.className = 'reservation-item';

        const itemLeftInfo = document.createElement('div');
        const timeReserved = document.createElement('div');
        const status = document.createElement('div');
        timeReserved.innerText = reservation.timeReserved;
        status.innerText = reservation.status;
        itemLeftInfo.appendChild(timeReserved);
        itemLeftInfo.appendChild(status);

        const itemMiddleInfo = document.createElement('div');
        const customerInfo = document.createElement('div');
        const customers = document.createElement('div');
        const menus = document.createElement('div');
        customerInfo.innerText = `${reservation.customer.name}-${[
          ...reservation.tables.map((table) => table.name),
        ]}`;
        customers.innerText = `성인 ${reservation.customer.adult} 아이 ${reservation.customer.child}`;
        reservation.menus.map((menu) => {
          const menuInfo = document.createElement('div');
          menuInfo.innerHTML = `${menu.name} (${menu.qty})`;
          menus.appendChild(menuInfo);
        });
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
            this.reservations[index].status = 'seated';
          } else if (reservation.status === 'seated') {
            this.reservations[index].status = 'done';
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

    new ReservationDetail(wrapper, this.reservations[this.focusedIndex]);

    wrapper.appendChild(reservations);
    this.section.appendChild(wrapper);
  }
}
