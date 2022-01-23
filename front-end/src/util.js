/*import dayjs from 'dayjs'


export function getMonth(month = dayjs().month()) {

    const year = dayjs().year()
    const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day()

    const daysMatrix = new Array(5).fill([]).map(() => {
        new Array()
    }
   )

}