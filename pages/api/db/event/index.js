import prisma from '../../../../lib/prisma'

export default async function assetHandler(req, res) {
  const { method } = req

  switch (method) {
    case 'GET':
        try {
            const allEventsData = await prisma.event.findMany({
                orderBy: {
                    startDate: 'asc',
                },
                select: {
                    name: true,
                    nameJp: true,
                    slug: true,
                    startDate: true,
                    endDate: true,
                    sector: {
                        select: {
                            location: true,
                        },
                    },
                    hero: {
                        select: {
                            name: true,
                        },
                    },
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
                    cards: true,
                },
            }
            )
            res.status(200).json(allEventsData)
        } catch (e) {
            console.error('Request error', e)
            res.status(500).json({ error: 'Error fetching event data' })
        }
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
      break
  }
}