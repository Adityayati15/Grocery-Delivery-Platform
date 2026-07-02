import prisma from "../src/config/prisma.js";

async function seedProducts() {
  await prisma.product.createMany({
    data: [
      {
        name: "Amul Butter",
        description: "Fresh salted butter",
        priceInPaise: 5800,
        stock: 80,
        brand: "Amul",
        category: "Dairy",
        unit: "500g",
        imageUrl: "https://example.com/amul-butter.jpg",
      },
      {
        name: "Mother Dairy Toned Milk",
        description: "Healthy toned milk",
        priceInPaise: 3000,
        stock: 120,
        brand: "Mother Dairy",
        category: "Dairy",
        unit: "500ml",
        imageUrl: "https://example.com/mother-dairy-milk.jpg",
      },
      {
        name: "Tata Salt",
        description: "Vacuum evaporated iodized salt",
        priceInPaise: 2800,
        stock: 200,
        brand: "Tata",
        category: "Grocery",
        unit: "1kg",
        imageUrl: "https://example.com/tata-salt.jpg",
      },
      {
        name: "Aashirvaad Atta",
        description: "Whole wheat flour",
        priceInPaise: 5200,
        stock: 150,
        brand: "Aashirvaad",
        category: "Grocery",
        unit: "5kg",
        imageUrl: "https://example.com/aashirvaad-atta.jpg",
      },
      {
        name: "Maggi 2-Minute Noodles",
        description: "Instant noodles",
        priceInPaise: 1400,
        stock: 250,
        brand: "Nestlé",
        category: "Instant Food",
        unit: "280g",
        imageUrl: "https://example.com/maggi.jpg",
      },
      {
        name: "Lay's Classic Chips",
        description: "Salted potato chips",
        priceInPaise: 2000,
        stock: 180,
        brand: "Lay's",
        category: "Snacks",
        unit: "100g",
        imageUrl: "https://example.com/lays-classic.jpg",
      },
      {
        name: "Good Day Biscuits",
        description: "Butter cookies",
        priceInPaise: 3500,
        stock: 140,
        brand: "Britannia",
        category: "Snacks",
        unit: "200g",
        imageUrl: "https://example.com/good-day.jpg",
      },
      {
        name: "Coca-Cola",
        description: "Refreshing soft drink",
        priceInPaise: 4000,
        stock: 90,
        brand: "Coca-Cola",
        category: "Beverages",
        unit: "750ml",
        imageUrl: "https://example.com/coca-cola.jpg",
      },
      {
        name: "Tropicana Orange Juice",
        description: "100% orange fruit juice",
        priceInPaise: 11000,
        stock: 70,
        brand: "Tropicana",
        category: "Beverages",
        unit: "1L",
        imageUrl: "https://example.com/tropicana-orange.jpg",
      },
    ],
  });

  console.log("✅ Products seeded successfully!");
}

seedProducts()
  .catch((error) => {
    console.error("❌ Error while seeding products:");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });