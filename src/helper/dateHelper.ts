const dayjs = require('dayjs');

export const formatDate = (date: Date) => {
    return dayjs(date).format('YYYY/MM/DD');
}

export const addMinutes = (date: Date, minutes: number): Date => {
    return dayjs(date).add(minutes, 'minute');
}

export const addSeconds = (date: Date, seconds: number): Date => {
    return dayjs(date).add(seconds, 'second');
}

export const addMilliseconds = (date: Date, milliseconds: number): Date => {
    return dayjs(date).add(milliseconds, 'millisecond');
}