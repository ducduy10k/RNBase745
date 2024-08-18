import Moment from 'moment';

export function formatDate(date: Date, format: string): string {
    Moment.locale('en');
    return Moment(date).format(format)  //basically you can do all sorts of the formatting and others
}

export function getDateMinusDays(date: Date, days: number): Date {
    return Moment(date).subtract(days, 'days').toDate();
}

export function isInvalidDate(date: Date): boolean {
    return date.toString() === 'Invalid Date';
}