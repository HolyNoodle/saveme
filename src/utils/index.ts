import moment from 'moment';

export const convertJavaDateToMoment = (date: string) => moment(date, 'yyyy-MM-DD HH:mm:ss');

export const sanitizeClassName = (className: string = '') => className.replace(/\./g, '-');