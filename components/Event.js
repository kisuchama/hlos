import Link from "next/link";

export default function Event({ event }) {
    return (
        <li>
            <Link href="/event/[id]" as={`/event/${event.slug}`}>
                <a className="link-underline leading-normal">{event.name}</a>
            </Link>
        </li>
    )
}