import { Handler } from '@netlify/functions'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

const handler: Handler = async (event) => {
  if (event.body){
    const newEntry = JSON.parse(event.body)
    const {id}  = newEntry
    try {
      const textRecord = await prisma.text_data.findFirstOrThrow({
      where:{
        id
      }
    });
    console.log("textRecord in getText",{textRecord})

      return {
        statusCode: 200,
        body: JSON.stringify(textRecord)
      }
    } catch (e) {
        return {
          statusCode: 500, 
          message: e
        }
    }
  }
  return {statusCode: 500}
}

export { handler }

