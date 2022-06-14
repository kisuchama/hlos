import prisma from '../lib/prisma'
import Layout from '../components/layout'
import Head from 'next/head'
import Chapter from '../components/Chapters'

export async function getStaticProps() {
    const story = await prisma.mainStory.findMany({
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
        props: { story }
    }
}

export default function StoryIndex({ story }) {
    return (
        <Layout>
            <Head>
                <title>Main Story</title>
            </Head>
            <h1 className='text-6xl font-extrabold uppercase text-center mb-12'>Main Story</h1>
            {story.map((c, i) => (
                <Chapter key={i} chapter={c} />
            ))}
        </Layout>
    )
}