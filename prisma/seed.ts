const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function seedDatabase() {
  try {
    const images = [
      "https://raw.githubusercontent.com/cicerosnt/carvalho-barber/main/public/user-pedro.png",
      "https://raw.githubusercontent.com/cicerosnt/carvalho-barber/main/public/user-leo.png",
    ];
    // Nomes criativos para as barbearias
    const creativeNames = [
      "Pedro",
      "Leonardo",
    ];

    // Endereços fictícios para as barbearias
    const addresses = [
      "R. Alagoas, 121 - Centro, Catanduva - SP",
      "R. Alagoas, 121 - Centro, Catanduva - SP",
    ];

    const services = [
      {
        name: "Corte de Cabelo",
        description: "Estilo personalizado com as últimas tendências.",
        price: 60.0,
        imageUrl: "https://utfs.io/f/0ddfbd26-a424-43a0-aaf3-c3f1dc6be6d1-1kgxo7.png",
      },
      {
        name: "Barba",
        description: "Modelagem completa para destacar sua masculinidade.",
        price: 40.0,
        imageUrl: "https://utfs.io/f/e6bdffb6-24a9-455b-aba3-903c2c2b5bde-1jo6tu.png",
      },
      {
        name: "Pézinho",
        description: "Acabamento perfeito para um visual renovado.",
        price: 35.0,
        imageUrl: "https://utfs.io/f/8a457cda-f768-411d-a737-cdb23ca6b9b5-b3pegf.png",
      },
      {
        name: "Sobrancelha",
        description: "Expressão acentuada com modelagem precisa.",
        price: 20.0,
        imageUrl: "https://utfs.io/f/2118f76e-89e4-43e6-87c9-8f157500c333-b0ps0b.png",
      },
      {
        name: "Massagem",
        description: "Relaxe com uma massagem revigorante.",
        price: 50.0,
        imageUrl: "https://utfs.io/f/c4919193-a675-4c47-9f21-ebd86d1c8e6a-4oen2a.png",
      },
      {
        name: "Hidratação",
        description: "Hidratação profunda para cabelo e barba.",
        price: 25.0,
        imageUrl: "https://utfs.io/f/8a457cda-f768-411d-a737-cdb23ca6b9b5-b3pegf.png",
      },
    ];

    
    // Telefones a serem adicionados
    const phones = [
      "17988077150",
      "17997198151"
  ]

    // Criar 10 barbearias com nomes, endereços e telefones fictícios
    const barbershops = [];
    for (let i = 0; i < 2; i++) {
      const name = creativeNames[i];
      const address = addresses[i];
      const imageUrl = images[i];
      const phone = phones[i]

      const barbershop = await prisma.barbershop.create({
        data: {
          name,
          address,
          imageUrl: imageUrl,
        },
      });

      for (const service of services) {
        await prisma.service.create({
          data: {
            name: service.name,
            description: service.description,
            price: service.price,
            barbershop: {
              connect: {
                id: barbershop.id,
              },
            },
            imageUrl: service.imageUrl,
          },
        });
      }

      await prisma.phone.create({
        data: {
          phone,
          barbershop: {
            connect: {
              id: barbershop.id,
            },
          },
        },
      });

      barbershops.push(barbershop);
    }

    // Fechar a conexão com o banco de dados
    await prisma.$disconnect();
  } catch (error) {
    console.error("Erro ao criar as barbearias:", error);
  }
}

seedDatabase();