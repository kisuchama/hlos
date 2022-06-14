import Link from "next/link";

export default function Event({ event }) {
    return (
        <li>
            <Link href="/event/[id]" as={`/event/${event.slug}`}>
                <a>{event.name}</a>
            </Link>
        </li>
    )
}