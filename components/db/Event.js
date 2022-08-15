import Link from "next/link";
import Image from "next/image";
import Date from "../Date";
import { CgArrowRight, CgCalendarToday } from 'react-icons/cg';
import { MdTranslate } from 'react-icons/md';

export default function Event({ event }) {
    const eventTranslators = []
    for ( var k = 0; k < event.translator.length; k++) {
        eventTranslators.push(event.translator[k].translator.name)
    }
    
    const distinctCameos = []
    const cameoClasses = []
    var c = '';
    var h = '';
    // limited to playable characters
    for ( var id = 1; id < 17; id++) {
        for ( var i=0; i < event.parts.length; i++) {
            c = event.parts[i].cameos
            for ( var j=0; j < c.length; j++) {
                h = c[j].hero
                if ((!distinctCameos.includes(h.name)) &&
                    (h.id == id)) {
                        distinctCameos.push(h.name)
                    }
            }
        }
    }
    for ( var x = 0; x < distinctCameos.length; x++ ) {
        cameoClasses.push('tag' + distinctCameos[x])
    }
    // determine cover img src
    const coverImg = [];
    let featured = '';
    if (event.hero) {
      featured = event.hero.name.toLowerCase();
    }
    if (event.noCover) {
      coverImg.push(`/images/event/${event.slug}/${featured}-evo.jpg`)
    } else {
      coverImg.push(`/images/event/${event.slug}/main.jpg`)
    }
    
    return (
        <div className={`filter-item indexCG flex flex-col bg-white ${cameoClasses.join(' ')}`}>
            <Link href={`/hlos/event/${event.slug}`}><a>
                <div>
                    <Image
                        src={coverImg[0]}
                        alt={event.name}
                        width={1024}
                        height={630}
                        className="z-0 absolute inset-0"
                    />
                </div>
                {event.sector ? (
                    <hr className={`border-0 h-1 bg-${event.sector.location.toLowerCase()}`} />
                ) : (
                    <></>
                )}
                {event.hero ? (
                    <hr className={`border-0 h-1 bg-${event.hero.name.toLowerCase()}`} />
                ) : (
                    <></>
                )}
                {!event.sector && !event.hero ? (
                    <hr className="border-0 h-1 bg-black" />
                ) : (
                    <></>
                )}                 
            </a></Link>
            <div className="indexCaption flex flex-col space-y-6 justify-between h-full">
                <h2 className="text-2xl lg:text-xl font-display">{event.name}</h2>
                
                <div className="flex flex-row mx-2 h-16 items-center justify-center">
                    {distinctCameos.map((h, i) => (
                        <Link key={i} href={`/hlos/chara/${h.toLowerCase()}`}>
                            <a className="h-80px w-88px relative inline-block">
                                <Image
                                    src={`/images/chibi/${h.toLowerCase()}.png`}
                                    alt={h}
                                    width={66}
                                    height={60} 
                                />
                            </a>
                        </Link>
                    ))}
                </div>
                <div className="text-sm self-end flex flex-row w-full">
                    <div className="self-end flex flex-row justify-between grow">
                        <div className="flex flex-row items-center">
                            <CgCalendarToday className="text-slate-400" /> 
                            <Date dateString={event.startDate} /> 
                            <CgArrowRight className="text-slate-400" /> 
                            <Date dateString={event.endDate} />
                        </div>
                        {eventTranslators.map((t, i) => (
                            <div key={i} className="flex flex-row items-center">
                            <MdTranslate className="inline-block mx-1" /> <a href={`https://twitter.com/${t}`} className="link-underline">@{t}</a>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

{/* <div>
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
</div> */}