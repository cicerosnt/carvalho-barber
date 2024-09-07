import { addMinutes, setHours, setMinutes, isAfter, format } from 'date-fns';

export function generateDayTimeList(date: Date, email: String | null | undefined): string[] {
    const currentTime = setMinutes(new Date(), 0); // Arredonda para a hora completa atual
    const startTime = setMinutes(setHours(date, 9), 0); // horário inicial 9:00
    const endTime = setMinutes(setHours(date, 19), 0); // horário final 17:00
    const interval = 60; // intervalo de 60 minutos
    const timeList: string[] = []; // lista de horários disponíveis
    
    const blockedTimesP = ["12:00", "13:00"]; 
    const blockedTimesL = ["12:00", "14:00"]; 
    
    

    let nextAvailableTime = startTime;

    while (nextAvailableTime < endTime) {
        if (isAfter(nextAvailableTime, currentTime)) {
            let formattedTime = format(nextAvailableTime, 'HH:mm');
            if (email == "pedromendesv96@gmail.com" && !blockedTimesP.includes(formattedTime)) {
                timeList.push(formattedTime);  
            }else if (email == "leodecarvalh@gmail.com" && !blockedTimesL.includes(formattedTime)) {
                timeList.push(formattedTime);  
            }else{
                timeList.push(formattedTime);
            }
        }
        nextAvailableTime = addMinutes(nextAvailableTime, interval);
    }

    return timeList;
}
