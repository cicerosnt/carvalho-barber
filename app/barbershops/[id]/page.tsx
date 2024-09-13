import { db } from "@/app/_lib/prisma";
import { Barbershop } from "@prisma/client";
import { getServerSession } from "next-auth";
import { Metadata } from "next";
import { authOptions } from "@/app/_lib/auth";
import { redirect } from "next/navigation";
import ResponsiveBarbershop from "./_components/ResponsiveBarbershop";

export const metadata: Metadata = {
  title: "Barbearia Carvalho | Agende o seu horário",
  description: "Barbearia Carvalho | Agende seu atendimento personalizado.",
  keywords: ["cortar cabelo", "barbeiro", "barbearia", "barba"],
  openGraph: {
    title: "Barbearia Carvalho | Agende o seu horário",
    description: "Barbearia Carvalho | Agende seu atendimento personalizado.",
    url: "https://www.carvalhobarbearia.com",
    images: [
      {
        url: "https://raw.githubusercontent.com/cicerosnt/carvalho-barber/main/public/carvalho-share.png",
        width: 800,
        height: 600,
        alt: "Barbearia Carvalho | Agende seu atendimento personalizado.",
      },
    ],
  },
  icons: {
    icon: "/favicon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

interface BarbershopDetailsProps {
  params: Barbershop;
}

const barbershopDetails = async ({ params }: BarbershopDetailsProps) => {
  const session = await getServerSession(authOptions);

  if (!params.id) {
    return redirect("/");
  }

  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
      phones: true,
    },
  });

  if (!barbershop) {
    return redirect("/");
  }

  return <ResponsiveBarbershop barbershop={barbershop} session={session} />;
};

export default barbershopDetails;
