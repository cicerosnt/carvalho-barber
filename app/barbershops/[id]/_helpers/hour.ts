import { addMinutes, setHours, setMinutes, isAfter, format, getDay } from 'date-fns';

export function generateDayTimeList(date: Date, userId: String): string[] {
    const dayIndex = date.getDay(); 
    
    const currentTime = setMinutes(new Date(), 0); // Arredonda para a hora completa atual
    const startTime = setMinutes(setHours(date, 9), 0); // horário inicial 9:00
    const endTime = setMinutes(setHours(date, dayIndex === 6 ? 17 : 20), 0);
    const interval = 60; // intervalo de 60 minutos
    const timeList: string[] = []; // lista de horários disponíveis
    let nextAvailableTime = startTime;
    
    
    const blockedTimesP = ["11:00", "12:00"]; 
    const blockedTimesL = ["12:00", "13:00"]; 
    const blockedTimesSaturday = ["12:00", "13:00"]; 
    
    const blockedTimesMap: { [key: string]: string[] } = {
        "6b32011b-d357-499b-ad4d-cf742ce4072e": blockedTimesP, // Pedro
        "67f2bf67-28f9-4685-99fe-624c637efc45": blockedTimesL, // Leo
    };
    
    while (nextAvailableTime < endTime) {
        if (isAfter(nextAvailableTime, currentTime)) {
            let formattedTime = format(nextAvailableTime, 'HH:mm')
            if (!blockedTimesMap[userId as any]?.includes(formattedTime)) {
                timeList.push(formattedTime)
              }
            console.log(userId)
        }
        nextAvailableTime = addMinutes(nextAvailableTime, interval);
    }

    return timeList;
}
