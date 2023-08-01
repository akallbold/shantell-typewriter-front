import { Handler } from '@netlify/functions'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

const handler: Handler = async (event) => {
  if(event.body) {
    const newEntry = JSON.parse(JSON.parse(event.body))
    const {id, text}  = newEntry
    await prisma.text_data.create({
      data: {
        id,
        text
      }
    });
    return {
      statusCode: 200,
      body: JSON.stringify(newEntry)
    };
  }

  return {
    statusCode: 500
  };
}


export { handler }

