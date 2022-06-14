import { PrismaClient } from '@prisma/client'

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === "development") global.prisma = prisma;

export default prisma

export async function getEventData() {
    try {
        const allEventsData = await prisma.event.findMany({
            orderBy: {
                startDate: 'asc',
            },
            select: {
                id: true,
                name: true,
                nameJp: true,
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
        res.status(200).json(allEventsData)
    } catch (e) {
        console.error('Request error', e)
        res.status(500).json({ error: 'Error fetching event data' })
    }
}