import {prisma} from "./prisma-client";
import {hashSync} from "bcrypt";
import {categories} from "@/prisma/constants";

async function up () {
    await prisma.user.createMany({
        data: [
            {
                fullName: "User Test",
                email: "john@example.com",
                password: hashSync("123456", 10),
                role: "USER",
                verified: new Date(),
            },
            {
                fullName: "Admin Test",
                email: "john2@example.com",
                password: hashSync("11111", 10),
                role: "ADMIN",
                verified: new Date(),
            }
        ]
    })

    await prisma.category.updateMany({
        data: categories
    })
}

async function down () {
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`
}

async function main () {
    try {
        await down();
        await up();
    } catch (error) {
        console.error(error)
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (err) => {
        console.error(err);
        await prisma.$disconnect();
        process.exit(1);
    })
