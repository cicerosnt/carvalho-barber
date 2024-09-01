"use client";

import { Button } from "@/app/_components/ui/button";
import { Calendar } from "@/app/_components/ui/calendar";
import { Card, CardContent } from "@/app/_components/ui/card";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet";
import { Barbershop, Booking, Service } from "@prisma/client";
import { ptBR } from "date-fns/locale/pt-BR";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { setHours } from "date-fns/setHours";
import { setMinutes } from "date-fns/setMinutes";
import { CalendarCheck, CalendarPlus, Loader2, XIcon } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getDayBookings } from "../_actions/getDayBookings";
import { generateDayTimeList } from "../_helpers/hour";
import { saveBookings } from "../_actions/saveBookings";
import BookingInfo from "@/app/_components/BookingInfo";

interface ServiceItemProps {
  barbershop: Barbershop;
  service: Service;
  isAuthenticated: boolean;
}

export const ServiceItem = ({
  service,
  isAuthenticated,
  barbershop,
}: ServiceItemProps) => {
  const router = useRouter();

  const { data } = useSession();

  const [date, setDate] = useState<Date | undefined>(undefined);
  const [hour, setHour] = useState<string | undefined>();
  const [submitIsLoading, setSubmitIsLoading] = useState(false);
  const [sheetIsOpen, setSheetIsOpen] = useState(false);
  const [dayBookings, setDayBookings] = useState<Booking[]>([]);

  useEffect(() => {
    if (!date) {
      return;
    }
    const refreshAvailableHours = async () => {
      const _dayBookings = await getDayBookings(barbershop.id, date);

      setDayBookings(_dayBookings);
    };

    refreshAvailableHours();
  }, [date, barbershop.id]);

  const handleDateClick = (date: Date | undefined) => {
    setDate(date);
    setHour(undefined);
  };

  const handleHourClick = (time: string) => {
    setHour(time);
  };

  const handleBookingClick = () => {
    if (!isAuthenticated) {
      return signIn("google");
    }
  };

  const handleBookingSubmit = async () => {
    setSubmitIsLoading(true);
    try {
      if (!hour || !date || !data?.user) {
        return;
      }

      const dateHour = Number(hour.split(":")[0]);
      const dateMinutes = Number(hour.split(":")[1]);

      const newDate = setMinutes(setHours(date, dateHour), dateMinutes);

      await saveBookings({
        serviceId: service.id,
        barbershopId: barbershop.id,
        date: newDate,
        userId: (data.user as any).id,
      });

      setSheetIsOpen(false);
      setHour(undefined);
      setDate(undefined);

      toast("Reserva realizada com sucesso", {
        description: format(newDate, "'Para' dd 'de' MMMM 'às' HH:mm'.'", {
          locale: ptBR,
        }),
        action: {
          label: "Visualizar",
          onClick: () => router.push("/bookings"),
        },
      });
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitIsLoading(false);
    }
  };

  const timeList = useMemo(() => {
    if (!date) {
      return [];
    }

    return generateDayTimeList(date).filter((time) => {
      const timeHour = Number(time.split(":")[0]);
      const timeMinutes = Number(time.split(":")[1]);

      const booking = dayBookings.find((booking) => {
        const bookingHour = Number(booking.date.getHours());
        const bookingMinutes = Number(booking.date.getMinutes());

        return bookingHour === timeHour && bookingMinutes === timeMinutes;
      });

      if (!booking) {
        return true;
      }

      return false;
    });
  }, [date, dayBookings]);

  const disabledDays = { dayOfWeek: [0, 1] };

  return (
    <Card className="lg:w-[49%]">
      <CardContent className="w-full p-0 overflow-auto">
        <div className="flex w-full items-center gap-2 p-2">
          <div className="relative max-h-[110px] min-h-[110px] min-w-[110px] max-w-[110px] p-0 m-0">
            <Image
              className="rounded-lg object-contain block"
              src={service.imageUrl}
              fill
              // style={{ objectFit: "contain" }}
              alt={service.name}
            />
          </div>

          <div className="flex w-full flex-col">
            <h2 className="font-bold text-sm">
              {service.name}
            </h2>
            <p className="text-sm text-gray-400">
              {service.description}
            </p>

            <div className="mt-2 flex items-center justify-between">
              <p className="font-semibold text-sm text-primary">
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(service.price))}
              </p>
              <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
                <SheetTrigger asChild>
                  <Button 
                    variant="default" 
                    onClick={handleBookingClick}
                    size="sm"
                    className="flex gap-2 text-sm py-1"
                  >
                  <CalendarPlus size={17} />
                    Reservar
                  </Button>
                </SheetTrigger>

                <SheetContent className="w-[80%] p-0">
                  <SheetHeader className="border-b border-solid border-secondary px-5 py-6 text-left ">
                    <SheetTitle>Fazer Reserva</SheetTitle>
                    <SheetClose asChild>
                      <Button
                        variant="outline"
                        className="z-20 absolute top-2 right-2 p-2 transition duration-200 ease-in-out"
                      >
                        <XIcon className="w-5 h-5" />
                      </Button>
                    </SheetClose>
                  </SheetHeader>

                  <div className="py-5">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={handleDateClick}
                      locale={ptBR}
                      fromDate={new Date()}
                      disabled={disabledDays}
                      styles={{
                        head_cell: {
                          width: "100",
                          textTransform: "capitalize",
                        },
                        cell: {
                          width: "100",
                        },
                        button: {
                          width: "100",
                        },
                        nav_button_previous: {
                          width: "32px",
                          height: "32px",
                        },
                        nav_button_next: {
                          width: "32px",
                          height: "32px",
                        },
                        caption: {
                          textTransform: "capitalize",
                        },
                      }}
                    />
                  </div>

                  {date && (
                    <div className="flex gap-3 overflow-x-auto border-t border-solid border-secondary p-5 [&::-webkit-scrollbar]:hidden">
                      {timeList.length > 0 ? (
                        <>
                          {timeList.map((time) => (
                          <Button
                            onClick={() => handleHourClick(time)}
                            variant={hour === time ? "default" : "outline"}
                            className="rounded-full"
                            key={time}
                          >
                            {time}
                          </Button>
                        ))}
                        </>
                      ):(
                        <p className="text-xs">Não encontramos horarios disponivéis!</p>
                      )}
                    </div>
                  )}

                  <div className="border-t border-solid border-secondary py-3">
                    <BookingInfo
                      booking={{
                        barbershop: barbershop,
                        date:
                          date && hour
                            ? setMinutes(
                                setHours(date, Number(hour.split(":")[0])),
                                Number(hour.split(":")[1]),
                              )
                            : undefined,
                        service: service,
                      }}
                    />
                  </div>

                  <SheetFooter className="px-3 mb-4">
                    <Button
                      onClick={handleBookingSubmit}
                      disabled={!hour || !date || submitIsLoading}
                      className="flex gap-2"
                    >
                      {submitIsLoading && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      <CalendarCheck size={18} />
                      Confirmar
                    </Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
