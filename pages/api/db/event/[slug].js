import prisma from '../../../../lib/prisma'

export default async function eventHandler({ query: { slug } }, res) {
  try {
    const eventData = await prisma.event.findUnique({
      where: {
        slug: slug
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
    })
    res.status(200).json(eventData)
  } catch (e) {
      console.error('Request error', e)
      res.status(500).json({ error: 'Error fetching event data' })
  }
}