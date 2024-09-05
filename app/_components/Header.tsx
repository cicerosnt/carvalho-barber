"use client";

import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { MenuIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import SideMenu from "./SideMenu";
import Link from "next/link";
import DesktopMenu from "./DesktopMenu";
import useIsMobile from "./_helpers/useIsMobile";

export const Header = () => {
  const isMobile = useIsMobile()

  return (
    <header className="mb-16 lg:mb-32">
      <Card className="lg:px-32 fixed top-0 lef-0 right-0 min-w-full z-10 rounded-none">
        <CardContent className="flex flex-row items-center justify-between p-5 ">
          <Link href="/">
            <Image src="/carvalho-barber-logo.png" alt="Carvalho Barbearia" height={22} width={90} />
          </Link>
          {isMobile ? (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="">
                  <MenuIcon size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[80%] p-0">
                <SideMenu />
              </SheetContent>
            </Sheet>
          ) : (
            <DesktopMenu />
          )}
        </CardContent>
      </Card>
    </header>
  );
};
