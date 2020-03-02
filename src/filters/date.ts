import Dayjs from 'dayjs'

export function formatDate(date: any, format?: string) {
    try {
        if (format === undefined) {
            if (isToday(date)) {
                return Dayjs(date).format('HH:mm')
            } else {
                return Dayjs(date).format('YYYY-MM-DD')
            }
        } else
            return Dayjs(date).format(format)
    } catch (e) {
        console.log(e);
        return "时间异常"
    }

}

function isToday(data: any) {
    let dateNow = new Date();
    return (new Date(data).setHours(0, 0, 0, 0) == dateNow.setHours(0, 0, 0, 0));
}

export default {formatDate}
