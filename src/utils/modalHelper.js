export const onClose = () => {
  const modal = document.querySelector('.reservation-detail');
  const body = document.querySelector('body');
  const scrollArea = document.querySelector('.reservations-list');

  modal.style.display = 'none';
  body.style.overflow = 'auto';
  scrollArea.style.overflow = 'auto';
};

export const onOpen = () => {
  const modal = document.querySelector('.reservation-detail');
  const body = document.querySelector('body');
  const scrollArea = document.querySelector('.reservations-list');

  modal.style.display = 'block';
  body.style.overflow = 'hidden';
  scrollArea.style.overflow = 'hidden';
};
