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
      <h3>예약 정보</h3>
      <button type="button" class="reservation-detail__button">닫기</button>
      <ul class="reservation-detail__ul">
        <li class="reservation-detail__li--short">예약 상태 <strong>${
          Status[this.reservation.status]
        }</strong></li>
        <li class="reservation-detail__li--short">예약 시간 <strong>${
          this.reservation.timeReserved
        }</strong></li>
        <li class="reservation-detail__li--short">접수 시간 <strong>${
          this.reservation.timeRegistered
        }</strong></li>
      </ul>
      <h3>고객 정보</h3>
      <ul class="reservation-detail__ul">
        <li class="reservation-detail__li--short">고객 성명 <strong>${
          this.reservation.customer.name
        }</strong></li>
        <li class="reservation-detail__li--short">고객 등급 <strong>${
          this.reservation.customer.level
        }</strong></li>
        <li class="reservation-detail__li--long">고객 메모 <strong>${
          this.reservation.customer.memo
        }</strong></li>
        <li class="reservation-detail__li--long">요청 사항 <strong>${
          this.reservation.customer.request
        }</strong></li>
      </ul>
    </div>
    `;

    const onClose = () => {
      const modal = document.querySelector('.reservation-detail');
      const body = document.querySelector('body');
      const scrollArea = document.querySelector('.reservations-list');

      modal.style.display = 'none';
      body.style.overflow = 'auto';
      scrollArea.style.overflow = 'auto';
    };

    const closeButton = detailItem.querySelector('.reservation-detail__button');

    closeButton.addEventListener('click', (e) => {
      if (isMobile()) onClose();
    });

    detailItem.addEventListener('click', (e) => {
      if (e.target.classList.contains('reservation-detail') && isMobile())
        onClose();
    });

    this.$target.appendChild(detailItem);
  }
}
