import dayjs from 'dayjs';

/**
 * 오늘 기준 날짜 자동 변환
 *
 * 오늘 : MM:mm
 * 올해 : MM-DD HH:mm
 * !올해 : YYYY-MM-DD HH:mm
 *
 * @param time {number} timestamp
 * @returns {*|string}
 */
export function getAutoFormattedDate(time) {
  try {
    const today = dayjs();
    const date = dayjs(time);

    let format = 'HH:mm';
    if (!today.isSame(date, 'year')) {
      format = 'YYYY-MM-DD';
    } else if (!today.isSame(date, 'month') || !today.isSame(date, 'day')) {
      format = 'MM-DD HH:MM';
    }

    return getFormattedDate(time, format);
  } catch (e) {
    return time;
  }
}

/**
 * 날짜 포맷에 맞게 변경
 * @param time
 * @param format YYYY / MM / DD / HH / mm / ss / sss
 * @returns {*\string}
 */
export function getFormattedDate(time, format) {
  try {
    return dayjs(time).format(format);
  } catch (e) {
    return time;
  }
}
