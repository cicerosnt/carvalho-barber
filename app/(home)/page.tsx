import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { Search } from "./_components/Search";
import { db } from "../_lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";
import BarbershopsCardGroup from "./_components/BarbershopsCardGroup";
import ExtraCardGroup from "./_components/ExtraCardGroup";
import ConfirmedBookings from "./_components/ConfirmedBookings";
import userSalute from "../_components/_helpers/formatSalute";

export default async function Home() {
  const session = await getServerSession(authOptions);

  const [barbershops, confirmedBookings] = await Promise.all([
    db.barbershop.findMany({}),
    session?.user
      ? db.booking.findMany({
          where: {
            userId: (session.user as any).id,
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
          },
        })
      : Promise.resolve([]),
  ]);

  return (
    <>
      <section className="lg:bg-desktop-bg lg:bg-cover lg:bg-top lg:bg-no-repeat lg:pb-16">
        <div className="lg:flex lg:gap-32 lg:overflow-hidden lg:px-32 ">
          <div className="lg:flex lg:w-[35vw] lg:flex-col lg:overflow-hidden">
            <div className="px-5 pt-5">
              <h2 className="text-xl font-semibold">
                {session?.user
                  ? `${userSalute()} ${session.user.name?.split(" ")[0]}.`
                  : `${userSalute()} Vamos fazer o seu agendamento?`}
              </h2>
              <p className="text-sm first-letter:uppercase">
                {format(new Date(), "EEEE',' dd 'de' MMMM", {
                  locale: ptBR,
                })}
              </p>
            </div>
            
            {/* <div className="mt-6 px-5">
              <Search />
            </div> */}

            {confirmedBookings.length > 0 ?(
              <ConfirmedBookings bookings={confirmedBookings} />
            ):(
              <div className="mt-5 mx-5 border-2 border-dashed rounded-lg border-zinc-400 border-spacing-4 p-6 bg-zinc-800 ">
                <p className="text-sm text-zinc-300">
                  Seus agendamentos serão exibidos aqui!
                </p>
              </div>
            )}
          </div>

          <div className="lg:w-[50%]">
            <BarbershopsCardGroup
              barbershops={barbershops}
              title="Professionais"
            />
          </div>
        </div>
      </section>

      {/* <section className="lg:px-32">
        <div className="mb-[4.5rem]">
          <ExtraCardGroup barbershops={barbershops} />
        </div>
      </section> */}
    </>
  );
}
