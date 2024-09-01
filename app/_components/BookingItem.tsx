"use client";

import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Phone, Prisma } from "@prisma/client";
import { format, isFuture } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import Image from "next/image";
import { Button } from "./ui/button";
import { cancelBooking } from "../_actions/cancelBooking";
import { toast } from "sonner";
import { Key, useState } from "react";
import { ArrowLeft, CalendarX, Loader2, Trash, XIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogHeader,
  AlertDialogFooter,
} from "./ui/alert-dialog";
import BookingInfo from "./BookingInfo";
import BarberShopPhoneInfo from "./BarbershopPhoneInfo";

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true;
      barbershop: true;
    };
  }>;
}

export const BookingItem = ({ booking }: BookingItemProps) => {
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const isBookingConfirmed = isFuture(booking.date);

  const handleCancelClick = async () => {
    setIsDeleteLoading(true);

    try {
      await cancelBooking(booking.id);

      toast.success("Reserva cancelada com sucesso!");
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleteLoading(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Card className="min-w-full ">
          <CardContent className="flex px-0 py-0">
            <div className="flex flex-[3] flex-col gap-2 py-3 pl-3">
              <Badge
                variant={isBookingConfirmed ? "default" : "secondary"}
                className="w-fit"
              >
                {isBookingConfirmed ? "Confirmado" : "Finalizado"}
              </Badge>
              <div className="flex flex-col gap-1">
                <h2 className="font-semibold">
                  {booking.service.name}
                </h2>
  
                <div className="flex items-center gap-2 mt-0 ">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={booking.barbershop.imageUrl} />
  
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                  <h3 className="text-sm">
                    {booking.barbershop.name}
                  </h3>
  
                </div>
              </div>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center border-l border-solid border-secondary">
              <p className="text-sm capitalize">
                {format(booking.date, "MMMM", {
                  locale: ptBR,
                })}
              </p>
              <p className="text-xl font-semibold">
                {format(booking.date, "dd")}
              </p>
              <p className="text-sm">
                {format(booking.date, "HH:mm")}
              </p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>

      <SheetContent className="w-[80%] px-0 overflow-x-auto ">
        <SheetHeader className="border-b border-solid border-secondary px-2 pb-6 text-left">
          <SheetTitle className="font-normal">Informações da Reserva</SheetTitle>
          
          <SheetClose asChild>
            <Button
              variant="outline"
              className="z-20 absolute top-2 right-2 p-2 transition duration-200 ease-in-out"
            >
              <XIcon className="w-5 h-5" />
            </Button>
          </SheetClose>
        </SheetHeader>

        <div className="px-2">
          <div className="relative mt-2 h-[180px] w-full">
            <Image
              src="/barbershop-map.png"
              fill
              alt={booking.barbershop.name}
              className="rounded-sm"
            />

            <div className="absolute bottom-2 left-0 w-full px-2">
              <Card>
                <CardContent className="flex gap-2 p-3">
                  <Avatar>
                    <AvatarImage src={booking.barbershop.imageUrl} />
                  </Avatar>

                  <div>
                    <h2 className="font-bold">{booking.barbershop.name}</h2>
                    <h3 className="overflow-hidden text-ellipsis text-nowrap text-xs">
                      {booking.barbershop.address}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Badge
            variant={isBookingConfirmed ? "default" : "secondary"}
            className="my-3 w-fit"
          >
            {isBookingConfirmed ? "Confirmado" : "Finalizado"}
          </Badge>

          <BookingInfo booking={booking} />

          <>
            {booking.barbershop.phones.map(
              (phones: { id: Phone; phone: Phone }) => (
                <div key={phones.id}>
                  <BarberShopPhoneInfo phones={phones.phone} />
                </div>
              ),
            )}
          </>

          <SheetFooter className="mt-6 flex-row gap-3 ">
            <SheetClose asChild>
              <Button  
                variant="default"
                className="flex gap-2 w-full"
              >
                <ArrowLeft size={18} />
                Voltar
              </Button>
            </SheetClose>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  disabled={!isBookingConfirmed || isDeleteLoading}
                  variant="ghost"
                  className="flex gap-2 w-full"
                >
                  <CalendarX size={18} />
                  Cancelar
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="w-[90%]">
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Deseja mesmo cancelar essa reserva?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Uma vez cancelada, não será possível reverter essa ação.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex-row gap-3">
                  <AlertDialogCancel className="mt-0 w-full bg-transparent">
                    <ArrowLeft size={18} />
                    Voltar
                  </AlertDialogCancel>
                  <AlertDialogAction
                    disabled={isDeleteLoading}
                    onClick={handleCancelClick}
                    className="w-full flex gap-2"
                  >
                      {isDeleteLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ):(<CalendarX size={18} />)}
                      Cancelar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
};
