import moment from 'moment';

export const convertJavaDateToMoment = (date) => 
  moment(date, 'YYYY-MM-DDTHH:mm:ss:SSZ');

  export const sanitizeClassName = (className = '') => className.replace(/\./g, '-');