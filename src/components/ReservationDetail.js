import { Status } from '../constants/UI.js';
import { isMobile } from '../utils/UIHelper.js';

export default class ReservationDetail {
  constructor($target, data) {
    this.$target = $target;
    this.reservation = data;
    this.render();
  }

  render() {
    const detailItem = document.createElement('div');
    detailItem.className = 'reservation-detail';

    detailItem.innerHTML = `
    <div class="reservation-detail__body">
      <h1>예약 정보</h1>
      <button type="button" class="reservation-detail__button">닫기</button>
      <ul>
        <li>예약 상태 ${Status[this.reservation.status]}</li>
        <li>예약 시간 ${this.reservation.timeReserved}</li>
        <li>접수 시간 ${this.reservation.timeRegistered}</li>
      </ul>
      <h1>고객 정보</h1>
      <ul>
        <li>고객 성명 ${this.reservation.customer.name}</li>
        <li>고객 등급 ${this.reservation.customer.level}</li>
        <li>고객 메모 ${this.reservation.customer.memo}</li>
        <li>요청 사항 ${this.reservation.customer.request}</li>
      </ul>
    </div>
    `;

    const closeButton = detailItem.querySelector('.reservation-detail__button');

    closeButton.addEventListener('click', (e) => {
      if (isMobile()) {
        const modal = document.querySelector('.reservation-detail');
        modal.style.display = 'none';
      }
    });

    detailItem.addEventListener('click', (e) => {
      if (e.target.classList.contains('reservation-detail')) {
        const modal = document.querySelector('.reservation-detail');
        modal.style.display = 'none';
      }
    });

    this.$target.appendChild(detailItem);
  }
}
