import { Handler } from '@netlify/functions'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

interface TextEntry {
  id: string,
  text: string
}

const handler: Handler = async (event, context) => {
  if(event.body) {
    const newEntry = JSON.parse(event.body) as TextEntry;
    await prisma.text_data.create({
      data: {
        id: newEntry.id,
        text: newEntry.text
      },
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

