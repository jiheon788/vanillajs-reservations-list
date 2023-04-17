export const timeFormatter = (timeStamp) => {
  const time = new Date(timeStamp);
  let hh = time.getHours();
  hh = hh >= 10 ? hh : '0' + hh;
  let mm = time.getMinutes();
  mm = mm >= 10 ? mm : '0' + mm;

  return `${hh}:${mm}`;
};

export const isMobile = () =>
  window.matchMedia('screen and (max-width: 1024px)').matches;
