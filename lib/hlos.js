import prisma from "./prisma"

export async function getMainStoryData() {
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
    
    return {
        props: { mainStoryData }
    }
}