export default class ReservationDetail {
  constructor($target, data) {
    this.detailItem = document.createElement('div');
    this.detailItem.className = 'reservation-detail';
    this.reservation = data;
    $target.appendChild(this.detailItem);
    this.render();
  }

  render() {
    const reservationInfo = document.createElement('div');
    const customerInfo = document.createElement('div');

    reservationInfo.innerHTML = `
    <h1>예약 정보</h1>
    <ul>
    <li>예약 상태 ${this.reservation.status}</li>
    <li>예약 시간 ${this.reservation.timeReserved}</li>
    <li>접수 시간 ${this.reservation.timeRegistered}</li>
    </ul>
    `;
    customerInfo.innerHTML = `
    <h1>고객 정보</h1>
    <ul>
    <li>고객 성명 ${this.reservation.customer.name}</li>
    <li>고객 등급 ${this.reservation.customer.level}</li>
    <li>고객 메모 ${this.reservation.customer.memo}</li>
    <li>요청 사항 ${this.reservation.customer.request}</li>
    </ul>
    `;

    this.detailItem.appendChild(reservationInfo);
    this.detailItem.appendChild(customerInfo);
  }
}
