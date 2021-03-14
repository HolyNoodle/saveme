import moment from 'moment';

export const convertJavaDateToMoment = (date) => 
  moment(date, 'yyyy-MM-dd HH:mm:ss');

  export const sanitizeClassName = (className = '') => className.replace(/\./g, '-');