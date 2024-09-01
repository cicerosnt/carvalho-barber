import { addMinutes, setHours, setMinutes, isAfter, format } from 'date-fns';

export function generateDayTimeList(date: Date): string[] {
    const currentTime = setMinutes(new Date(), 0); // Arredonda para a hora completa atual
    const startTime = setMinutes(setHours(date, 9), 0); // horário inicial 9:00
    const endTime = setMinutes(setHours(date, 17), 0); // horário final 17:00
    const interval = 60; // intervalo de 60 minutos
    const timeList: string[] = []; // lista de horários disponíveis

    let nextAvailableTime = startTime;

    while (nextAvailableTime < endTime) {
        if (isAfter(nextAvailableTime, currentTime)) {
            timeList.push(format(nextAvailableTime, 'HH:mm'));
        }
        nextAvailableTime = addMinutes(nextAvailableTime, interval);
    }

    return timeList;
}
