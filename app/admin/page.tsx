import { getServerSession } from "next-auth";
import { Header } from "../_components/Header";
import { redirect } from "next/navigation";
import { db } from "../_lib/prisma";
import { BookingItemAdmin } from "../_components/BookingItemAdmin";
import { Key } from "react";
import { Metadata } from "next";
import { authOptions } from "@/app/_lib/auth";
import { toast } from "sonner";
import isAdmin from "../_components/_helpers/isUserAdmin";

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
    index: false,
    follow: false,
  },
};

const BookingsPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect("/");
  }

  if (!(await isAdmin())) {
    return redirect("/");
  }

  const [confirmedBookings, finishedBookings] = await Promise.all([
    db.booking.findMany({
      where: {
        date: {
          gte: new Date(),
        },
      },
      orderBy: {
        date: "asc",
      },
      include: {
        service: true,
        barbershop: {
          include: {
            phones: true,
          },
        },
        user: true,
      },
    }),

    db.booking.findMany({
      where: {
        userId: (session.user as any).id,
        date: {
          lt: new Date(),
        },
      },
      orderBy: {
        date: "desc",
      },
      include: {
        service: true,
        barbershop: {
          include: {
            phones: true,
          },
        },
        user: true,
      },
    }),
  ]);

  return (
    <div className="lg:flex lg:w-full lg:justify-center lg:px-32">
      <div className="px-5 py-6 lg:mb-10 lg:w-1/2">
        <div>
          <h1 className="mb-6 text-xl font-bold">Gerenciar agendamentos</h1>

          {confirmedBookings.length > 0 ? (
            <>
              <h2 className="mb-3 text-sm font-bold uppercase text-gray-400">
                Confirmados
              </h2>
              <div className="flex flex-col gap-3">
                {confirmedBookings.map(
                  (booking: { id: Key | null | undefined }) => (
                    <BookingItemAdmin booking={booking} key={booking.id} />
                  ),
                )}
              </div>
            </>
          ) : (
            <div className="mt-5 border-spacing-4 rounded-lg border-2 border-dashed border-zinc-400 bg-zinc-800 p-6 ">
              <p className="text-sm text-zinc-300">
                Seus agendamentos serão exibidos aqui!
              </p>
            </div>
          )}
        </div>

        <div>
          {finishedBookings.length > 0 && (
            <>
              <h2 className="mb-3 mt-6 text-sm font-bold uppercase text-gray-400">
                Finalizados
              </h2>
              <div className="flex flex-col gap-3">
                {finishedBookings.map(
                  (booking: { id: Key | null | undefined }) => (
                    <BookingItemAdmin booking={booking} key={booking.id} />
                  ),
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingsPage;
