"use client";

import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Barbershop, Phone } from "@prisma/client";
import { ArrowLeft, ArrowUpRight, ArrowUpRightSquare, StarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BarbershopCardProps {
  barbershop: Barbershop;
}

export const BarbershopsCard = ({ barbershop }: BarbershopCardProps) => {
  const router = useRouter();

  const handleBookingClick = () => {
    router.push(`/barbershops/${barbershop.id}`);
  };

  return (
    <Card className="min-w-full max-w-full rounded-2xl cursor-pointer" onClick={handleBookingClick}>
      <CardContent className="px-1 py-0 pt-1">
        <div className="relative h-[159px] w-full">
          {/* <div className="absolute left-2 top-2 z-50">
            <Badge
              variant="secondary"
              className="left-3 top-3 z-50 flex items-center gap-1 opacity-90"
            >
              <StarIcon size={12} className="fill-primary text-primary" />
              <span className="text-xs">5,0</span>
            </Badge>
          </div> */}
          <Image
            alt={barbershop.name}
            src={barbershop.imageUrl}
            style={{
              objectFit: "cover",
            }}
            sizes="100vw"
            fill
            className="rounded-2xl"
          />
        </div>

        <div className="px-2 pb-3">
          <h2 className="mt-2 overflow-hidden text-ellipsis text-nowrap font-bold">
            {barbershop.name}
          </h2>
          <p className="overflow-hidden text-ellipsis text-nowrap text-sm text-gray-400">
            {barbershop.address}
          </p>
          <Button
            variant="default"
            className="mt-3 w-full flex gap-2 items-center text-zinc-800"
            onClick={handleBookingClick}
          >
            Reservar
            <ArrowUpRight size={15} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
