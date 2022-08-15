import Link from "next/link";
import Image from "next/image";
import { MdTranslate, MdChangeCircle } from 'react-icons/md';
import { FaStar } from 'react-icons/fa';
import { useState, useEffect } from 'react';

export default function Card({ card, eventPage }) {
  const [evolved, setEvolved] = useState(true);
  function toggleEvo() {
    setEvolved(!evolved)
  }

  const cardTranslators = []
  for ( let k = 0; k < card.translation.length; k++) {
    cardTranslators.push(card.translation[k].translator.name)
  }

  const distinctCameos = []
  const cameoClasses = []
  let c = card.cameos;
  let h = '';
  // limited to playable characters
  for (let id = 1; id < 17; id++) {
    for ( let j = 0; j < c.length; j++) {
      h = c[j].hero
      if ((!distinctCameos.includes(h.name)) &&
          (h.id == id)) {
              distinctCameos.push(h.name)
          }
    }
  }
  
  for ( var x = 0; x < distinctCameos.length; x++ ) {
      cameoClasses.push('tag' + distinctCameos[x])
  }

  const rarity = []
  for (let stars = 0; stars < card.rarity; stars++) {
    rarity.push(<FaStar className={`inline-block mx-0.5 mb-0.5 text-${card.hero.name.toLowerCase()}`} />)
  }

  return (
    <div className={`cardCG w-full flex flex-col bg-white ${cameoClasses.join(' ')}`}>
      <div className="relative">
        <div className="z-10 absolute top-2 pr-4 bg-gradient-to-r from-white via-white">
          {rarity}
        </div>
        <button className="z-10 absolute bottom-4 right-2" onClick={toggleEvo}>
          <MdChangeCircle className={`text-${card.hero.name.toLowerCase()} bg-white rounded-full rotate-90 hover:rotate-0 transition-transform duration-300 text-3xl`} />
        </button>
        <a href={card.translation[0] ? card.translation[0].link : undefined}><Image
          src={`/images/event/${card.event.slug}/${card.hero.name.toLowerCase()}${evolved ? '-evo' : ''}.jpg`}
          alt={`${(card.hero.name != 'Junior') ?  card.hero.name : ''} ${card.hero.surname} ${card.rarity}★ ${card.event.name}`}
          width={1024}
          height={630}
          className="z-0 absolute inset-0 mb-1"
        /></a>
      </div>
      <hr className={`border-0 h-2 bg-${card.hero.name.toLowerCase()}`} />
      <div className="mt-1 indexCaption flex flex-col space-y-6 justify-between h-full">
          <h2 className={`text-2xl lg:text-xl font-display ${!(card.title) ? 'font-extrabold' : ''}`}>{card.title ? card.title : card.titleJp}</h2>
          
          <div className="flex flex-row mx-2 h-12 items-center justify-center">
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
          <div className="text-sm flex flex-row justify-end">
            {cardTranslators.map((t, i) => (
                <div key={i} className="flex flex-row items-center">
                <MdTranslate className="inline-block mx-1" /> <a href={`https://twitter.com/${t}`} className="link-underline">@{t}</a>
            </div>
            ))}
          </div>
      </div>
    </div>
  )
}