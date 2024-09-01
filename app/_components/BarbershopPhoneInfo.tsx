"use client";

import { PhoneOutgoing } from "lucide-react";
import { Button } from "./ui/button";
import { Phone } from "@prisma/client";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { toast } from "sonner";
import { formatPhoneNumber } from "./_helpers/formatPhoneNumber";
import Link from "next/link";

interface BarberShopPhoneInfoProps {
  phones: Phone;
}

const BarberShopPhoneInfo = ({ phones }: BarberShopPhoneInfoProps) => {
  const [copiedText, copyToClipboard] = useCopyToClipboard();

  const handleClick = (phones: string) => {
    copyToClipboard(phones);

    toast.success(`O número ${phones} foi copiado`);
  };
  
  const handleWhats = (phones: string) => {
    toast.success(`Abrindo o WhatsApp ${phones}`);
      
    window.location.href = `https://wa.me/55${phones}?text=`;
  };
  
  const handleCall = (phones: string) => {
    toast.success(`Ligando para ${phones}`);
    
    window.location.href = `tel:+55${phones}`;
  };

  return (
    <div className="mt-3 flex items-center justify-between lg:mt-5">
      <div className="flex">
        <p className="text-sm">{formatPhoneNumber(phones)}</p>
      </div>
      <div className="flex gap-2">
        <Button 
          variant="secondary" 
          size="icon" 
          onClick={() => handleCall(phones)}
          className="w-10 h-10 p-1 flex items-center justify-center"
        >
          <PhoneOutgoing size={17}/>
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => handleWhats(phones)}
          className="w-10 h-10 p-1 flex items-center justify-center bg-lime-800"
        >
          <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.5498 4.90999C18.6329 3.9841 17.5408 3.24996 16.3373 2.75036C15.1338 2.25075 13.8429 1.99568 12.5398 1.99999C7.0798 1.99999 2.6298 6.44999 2.6298 11.91C2.6298 13.66 3.0898 15.36 3.9498 16.86L2.5498 22L7.7998 20.62C9.2498 21.41 10.8798 21.83 12.5398 21.83C17.9998 21.83 22.4498 17.38 22.4498 11.92C22.4498 9.26999 21.4198 6.77999 19.5498 4.90999ZM12.5398 20.15C11.0598 20.15 9.6098 19.75 8.3398 19L8.0398 18.82L4.9198 19.64L5.7498 16.6L5.5498 16.29C4.72735 14.9771 4.29073 13.4593 4.2898 11.91C4.2898 7.36999 7.9898 3.66999 12.5298 3.66999C14.7298 3.66999 16.7998 4.52999 18.3498 6.08999C19.1174 6.85386 19.7257 7.76254 20.1394 8.76332C20.5531 9.76411 20.764 10.8371 20.7598 11.92C20.7798 16.46 17.0798 20.15 12.5398 20.15ZM17.0598 13.99C16.8098 13.87 15.5898 13.27 15.3698 13.18C15.1398 13.1 14.9798 13.06 14.8098 13.3C14.6398 13.55 14.1698 14.11 14.0298 14.27C13.8898 14.44 13.7398 14.46 13.4898 14.33C13.2398 14.21 12.4398 13.94 11.4998 13.1C10.7598 12.44 10.2698 11.63 10.1198 11.38C9.9798 11.13 10.0998 11 10.2298 10.87C10.3398 10.76 10.4798 10.58 10.5998 10.44C10.7198 10.3 10.7698 10.19 10.8498 10.03C10.9298 9.85999 10.8898 9.71999 10.8298 9.59999C10.7698 9.47999 10.2698 8.25999 10.0698 7.75999C9.8698 7.27999 9.6598 7.33999 9.5098 7.32999H9.0298C8.8598 7.32999 8.5998 7.38999 8.3698 7.63999C8.1498 7.88999 7.5098 8.48999 7.5098 9.70999C7.5098 10.93 8.3998 12.11 8.5198 12.27C8.6398 12.44 10.2698 14.94 12.7498 16.01C13.3398 16.27 13.7998 16.42 14.1598 16.53C14.7498 16.72 15.2898 16.69 15.7198 16.63C16.1998 16.56 17.1898 16.03 17.3898 15.45C17.5998 14.87 17.5998 14.38 17.5298 14.27C17.4598 14.16 17.3098 14.11 17.0598 13.99Z" fill="white"/>
          </svg>

        </Button>
      </div>
    </div>
  );
};

export default BarberShopPhoneInfo;
