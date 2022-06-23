import Link from "next/link";
import Image from "next/image";

export default function Event({ event }) {
    return (
        <div>
            <Link href={`/event/${event.slug}`}><a className="relative">
                <div className="z-20 absolute inset-0 flex mb-10 ml-5 mt-5 pr-10">
                    <h2 className="text-3xl lg:text-2xl font-display px-2 highlight self-end"><span>{event.name}</span></h2>
                    <p className="text-4xl lg:text-3xl font-display highlight"><span>PT.{event._count.parts}</span></p>
                </div>
                <div className="imgCG">
                    <Image
                        src={`/images/event/${event.slug}/main.jpg`}
                        alt={event.name}
                        width={1024}
                        height={630}
                        className="z-0 absolute inset-0"
                    />
                </div>
            </a></Link>
        </div>
    )
}