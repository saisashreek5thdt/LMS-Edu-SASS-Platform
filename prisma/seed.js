const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Optional: clear existing data
  await prisma.subscription.deleteMany();
  await prisma.feature.deleteMany();
  await prisma.plan.deleteMany();
  await prisma.category.deleteMany();

  // ✅ Seed Categories
  await prisma.category.createMany({
    data: [
      { id: 1, name: "Design" },
      { id: 2, name: "Development" },
      { id: 3, name: "Product Management" },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Categories seeded");

  // ✅ Seed Plans
  const basic = await prisma.plan.create({
    data: {
      title: "Basic",
      subtitle: "Ideal for Solo Entrepreneurs",
      priceMonthly: 500,
      priceYearly: 4800,
      rate: "2.5% for 3rd-party payment providers",
      popular: false,
      features: {
        create: [
          { text: "Unlimited Teachers" },
          { text: "Email Support" },
          { text: "Basic Analytics" },
          { text: "Single User" },
        ],
      },
    },
  });

  const professional = await prisma.plan.create({
    data: {
      title: "Professional",
      subtitle: "Ideal for small teams",
      priceMonthly: 1500,
      priceYearly: 14400,
      rate: "1.8% 3rd-party payment providers",
      popular: true,
      features: {
        create: [
          { text: "Bulk Upload" },
          { text: "Priority Email + Chat Support" },
          { text: "Custom Reports" },
          { text: "Team Access (up to 10 users)" },
          { text: "API Access" },
        ],
      },
    },
  });

  const enterprise = await prisma.plan.create({
    data: {
      title: "Enterprise",
      subtitle: "Ideal for Scaling Teams",
      priceMonthly: null,
      priceYearly: null,
      rate: "1% 3rd-party payment providers",
      popular: false,
      features: {
        create: [
          { text: "Dedicated Account Manager" },
          { text: "SSO Integration" },
          { text: "Advanced Security" },
          { text: "Custom Contract Pricing" },
          { text: "Onboarding Training" },
          { text: "24/7 Phone & Chat Support" },
        ],
      },
    },
  });

  console.log("✅ Plans seeded:", {
    basic: basic.id,
    professional: professional.id,
    enterprise: enterprise.id,
  });
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
