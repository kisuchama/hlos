import { useRouter } from "next/router";
import useSWR from "swr";
import StoryPart from "../../components/StoryPart";
import Layout from '../../components/layout'
import Head from 'next/head'
import Image from "next/image"
import Date from "../../components/date";

const fetcher = async (url) => {
    const res = await fetch(url)
    const data = await res.json()

    if (res.status !== 200) {
        throw new Error(data.message)
    }
    return data
}

export default function EventPage() {
    const { query } = useRouter()
    const { data, error } = useSWR(
        () => query.slug && `/api/db/event/${query.slug}`,
        fetcher
    )

    if (error) return <div>{error.message}</div>
    if (!data) return <div>Loading...</div>

    return (
        <Layout>
            <Head>
                <title>{data.name}</title>
            </Head>
            <h1 className="text-4xl font-extrabold text-center leading-loose">{data.name}</h1>
            <div className="grid lg:grid-cols-2 gap-8">
                <div>
                    <div className="lg:sticky lg:top-4">
                        <Image
                            src={`/images/${data.slug}/main.png`}
                            alt={data.name}
                            width={1280}
                            height={720}
                        />
                        <div className="my-4">
                            <span><Date dateString={data.startDate} /> → <Date dateString={data.endDate} /></span>
                            <p className="py-4">Fetch event description. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eleifend id ante a mollis. Quisque laoreet auctor venenatis. Ut ligula metus, sagittis ac bibendum eu, dapibus et justo. Nam suscipit sagittis dolor, at accumsan eros congue quis. Fusce sit amet elit eros. Phasellus ultricies risus sit amet metus molestie porta.</p>
                        </div>
                    </div>
                </div>
                <div>
                    {data.parts.map((p, i) => (
                        <StoryPart key={i} part={p} />
                    ))}
                </div>
            </div>
        </Layout>
    )
}