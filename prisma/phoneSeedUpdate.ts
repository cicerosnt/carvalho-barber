//const { PrismaClient } = require("@prisma/client");

//const prisma = new PrismaClient();

//descomentar as 2 linhas acima para antes de rodar o script
//foram comentadas apenas para parar o erro de typescript

async function phoneSeedUpdate() {
  try {
    // Telefones a serem adicionados
    const phones = [
      "17988077150",
      "17997198151"
    ];

    const barbershops = await prisma.barbershop.findMany();

    // Cada barbershop receberá 1 telefone
    for (let i = 0; i < barbershops.length; i++) {
      const barbershop = barbershops[i];
      const phone = phones[i];

      await prisma.phone.create({
        data: {
          phone: phone,
          barbershopID: barbershop.id,
        },
      });
    }

    // Fechar a conexão com o banco de dados
    await prisma.$disconnect();
  } catch (error) {
    console.error(
      "Erro ao criar os números de telefone das barbearias:",
      error,
    );
  }
}

seedDatabase();
