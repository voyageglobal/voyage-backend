import "dotenv/config"
import { PrismaClient } from "@prisma/client"
import { processGuideCategoriesSeed } from "./seeds/guide-categories"
import { processCountriesSeed } from "./seeds/countries"
import { processCitiesSeed } from "./seeds/cities"

const env = process.env.NODE_ENV
const isProduction = env === "production"

const prisma = new PrismaClient()

async function main() {
  console.log(`Start seeding...`)
  console.log(`Env: ${env}`)

  if (isProduction) {
    console.error(`Seeding is not allowed in production.`)
    return
  }

  console.log(`Seeding Guide Categories started`)
  try {
    const isSuccessful = await processGuideCategoriesSeed(prisma)

    if (!isSuccessful) {
      console.error(`Error on Guide Categories seeding`)
    }
  } catch (error) {
    console.error(`Error on Guide Categories seeding: ${error}`)
  }
  console.log(`Seeding Guide Categories finished`)

  console.log("Seeding countries started")
  try {
    const isSuccessful = await processCountriesSeed(prisma)

    if (!isSuccessful) {
      console.error(`Error on countries seeding`)
    }
  } catch (error) {
    console.error(`Error on countries seeding: ${error}`)
  }
  console.log(`Seeding countries finished`)

  // console.log("Seeding cities started")
  // try {
  //   const isSuccessful = await processCitiesSeed(prisma)
  //
  //   if (!isSuccessful) {
  //     console.error(`Error on cities seeding`)
  //   }
  // } catch (error) {
  //   console.error(`Error on cities seeding: ${error}`)
  // }
  // console.log(`Seeding cities finished`)

  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })

  .catch(async e => {
    console.error(e)

    await prisma.$disconnect()

    process.exit(1)
  })
