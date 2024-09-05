"use client";

import { Button } from "@/app/_components/ui/button";
import { Key, useState } from "react";
import BarbershopDetails from "./BarbershopDetails";
import { ServiceItem } from "./ServiceItem";
import { Barbershop } from "@prisma/client";
import { Session } from "next-auth";
import useIsMobile from "@/app/_components/_helpers/useIsMobile";
import { EyeIcon, ScissorsLineDashedIcon } from "lucide-react";

interface InfoTogglerProps {
  barbershop: Barbershop;
  session: Session | null;
}

const InfoToggler = ({ barbershop, session }: InfoTogglerProps) => {
  const [openDetails, setOpenDetails] = useState(false);
  const isMobile = useIsMobile();

  const handleClick = () => {
    setOpenDetails(!openDetails);
  };

  return (
    <>
      <div className="px-5 sm:px-0 sm:pl-5 ">
        {isMobile ? (
          <>
            <div className="mt-6 flex gap-3">
              <Button
                onClick={handleClick}
                variant={!openDetails ? "default" : "outline"}
                className="flex gap-2 text-zinc-800"
              >
                <ScissorsLineDashedIcon size={20} />
                Serviços
              </Button>
              <Button
                onClick={handleClick}
                variant={openDetails ? "default" : "outline"}
                className={`flex gap-2 ${openDetails ? "text-zinc-800" : "text-zinc-100"}`}
              >
                <EyeIcon size={20} />
                Informações
              </Button>
            </div>
            {openDetails ? (
              <div className="mb-10 mt-6 ">
                <BarbershopDetails barbershop={barbershop} />
              </div>
            ) : (
              <div className="mb-10 flex flex-col gap-5 py-6 mr-5">
                {barbershop.services.map(
                  (service: { id: Key | null | undefined }) => (
                    <ServiceItem
                      key={service.id}
                      barbershop={barbershop}
                      service={service}
                      isAuthenticated={!!session?.user}
                    />
                  ),
                )}
              </div>
            )}
          </>
        ) : (
          <>
            <div className="mb-10 flex flex-wrap gap-5 py-6 pl-32">
              {barbershop.services.map(
                (service: { id: Key | null | undefined }) => (
                  <ServiceItem
                    key={service.id}
                    barbershop={barbershop}
                    service={service}
                    isAuthenticated={!!session?.user}
                  />
                ),
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default InfoToggler;
