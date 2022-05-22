import dayjs from 'dayjs'

export default (context, inject) => {
  const day = (date) => {
    return date ? dayjs(date) : dayjs()
  }

  inject('dayjs', day);
  context.$dayjs = day;
}