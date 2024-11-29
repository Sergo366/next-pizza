import {prisma} from "./prisma-client";
import {hashSync} from "bcrypt";
import {Prisma} from "@prisma/client";
import {categories, ingredient, products} from "./constants";

const randomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

const generateProductItem = ({
    productId,
    pizzaType,
    size
}: {
    productId: number,
    pizzaType?: number,
    size?: 20 | 30 | 40,
}) => ({
  productId,
  price: randomNumber(190, 600),
    pizzaType,
    size
}) as Prisma.ProductItemUncheckedCreateInput

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

    await prisma.category.createMany({
        data: categories
    })

    await prisma.ingredient.createMany({
        data: ingredient
    })

    await prisma.product.createMany({
        data: products
    })

    const pizza1 = await prisma.product.create({
        data: {
            name: 'Peperoni',
            imageUrl: 'https://media.dodostatic.com/image/r:292x292/11EF16A483ADD64E91433787A0041619.jpg',
            categoryId: 1,
            ingredients: {
                connect: ingredient.slice(0,5)
            }
        }
    })

    const pizza2 = await prisma.product.create({
        data: {
            name: 'Pizza 4 cheeses',
            imageUrl: 'https://media.dodostatic.com/image/r:292x292/11EF16A483ADD64E91433787A0041619.jpg',
            categoryId: 1,
            ingredients: {
                connect: ingredient.slice(5,10)
            }
        }
    })

    const pizza3 = await prisma.product.create({
        data: {
            name: 'Pizza with chicken',
            imageUrl: 'https://media.dodostatic.com/image/r:292x292/11EF16A483ADD64E91433787A0041619.jpg',
            categoryId: 1,
            ingredients: {
                connect: ingredient.slice(10,15)
            }
        }
    })

    await prisma.productItem.createMany({
        data: [
            generateProductItem({ productId: pizza1.id, pizzaType: 1, size: 20 }),
            generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 30 }),
            generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 40 }),

            generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 20 }),
            generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 30 }),
            generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 40 }),

            generateProductItem({ productId: pizza3.id, pizzaType: 1, size: 20 }),
            generateProductItem({ productId: pizza3.id, pizzaType: 1, size: 30 }),
            generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 40 }),
            generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 40 }),

            generateProductItem({ productId: 1 }),
            generateProductItem({ productId: 2 }),
            generateProductItem({ productId: 3 }),
            generateProductItem({ productId: 4 }),
            generateProductItem({ productId: 5 }),
            generateProductItem({ productId: 6 }),
            generateProductItem({ productId: 7 }),
            generateProductItem({ productId: 8 }),

        ]
    })

    await prisma.cart.createMany({
        data: [
            { userId: 1, totalAmount: 0, token: '1111' },
            { userId: 2, totalAmount: 0, token: '2222' },
        ]
    })

    await prisma.cartItem.create({
        data: {
            productItemId: 1,
            cartId: 1,
            quantity: 2,
            ingredients: {
                connect: [{id: 1}, {id: 2}, {id: 3}, {id:4}],
            }
        }
    })
}

async function down () {
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`
    await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`
    await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`
    await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`
    await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`
    await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`
    await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`
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
