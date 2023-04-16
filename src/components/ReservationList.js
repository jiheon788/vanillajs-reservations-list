export default class ReservationList {
  constructor($app, data) {
    this.section = document.createElement('section');
    this.section.className = 'reservation-list';
    this.reservations = data.reservations;
    $app.appendChild(this.section);
    this.render();
  }

  render() {
    this.section.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.className = 'wrapper';

    const reservations = document.createElement('div');
    reservations.className = 'reservations';

    if (this.reservations) {
      this.reservations.map((reservation) => {
        const item = document.createElement('div');
        item.className = 'reservation';

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
        if (reservation.status === 'reserved') {
          itemRightInfo.innerHTML = `<button>착석</button>`;
        }
        if (reservation.status === 'seated') {
          itemRightInfo.innerHTML = `<button>퇴석</button>`;
        }

        item.appendChild(itemLeftInfo);
        item.appendChild(itemMiddleInfo);
        item.appendChild(itemRightInfo);
        reservations.appendChild(item);
      });
    }

    wrapper.appendChild(reservations);
    this.section.appendChild(wrapper);
  }
}
