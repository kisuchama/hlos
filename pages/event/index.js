import useSWR from 'swr'
import Event from '../../components/Event'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function EventIndex() {
    const { data, error } = useSWR('/api/db/event', fetcher)

    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>

    return (
        <ul>
            {data.map((e, i) => (
                <Event key={i} event={e} />
            ))}
        </ul>
    )
}