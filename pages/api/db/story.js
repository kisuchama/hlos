import prisma from '../../../lib/prisma'

export default async function assetHandler(req, res) {
  const { method } = req

  switch (method) {
    case 'GET':
        try {
            const mainStoryData = await prisma.mainStory.findMany({
                orderBy: [
                    {season: 'asc'},
                    {chapter: 'asc'},
                ],
                select: {
                    season: true,
                    chapter: true,
                    name: true,
                    parts: {
                        select: {
                            part: true,
                            cameos: {
                                select: {
                                    hero: {
                                        select: {
                                            name: true,
                                            chibi: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            })
            res.status(200).json(mainStoryData)
        } catch (e) {
            console.error('Request error', e)
            res.status(500).json({ error: 'Error fetching story data' })
        }
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
      break
  }
}