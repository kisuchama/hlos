import { MdFilterList } from "react-icons/md"
import { CgCloseR } from "react-icons/cg";
import { useRef, useState, useEffect } from "react";
import Isotope from "isotope-layout";
import Image from "next/image";

export default function StoryFilter({ page }) {
    const [showFilters, setShowFilters] = useState(false);
    function toggleFilters() {
        setShowFilters(!showFilters)
    }

    const heroes = [
        'Akira','Will','Brad','Oscar',
        'Ren','Gast','Victor','Marion',
        'Junior','Faith','Keith','Dino',
        'Gray','Billy','Asch','Jay'
    ]

    // ISOTOPE
    // init one ref to store the future isotope object
  const isotope = useRef()
  // store the filter keyword in a state
  const [filterKey, setFilterKey] = useState('*')

  // initialize an Isotope object with configs
  useEffect(() => {
    isotope.current = new Isotope('.filter-container',{
      percentPosition: true,
      itemSelector : '.filter-item',
      masonry:{
        gutter: 20
      }
    })
    // cleanup
    return () => isotope.current.destroy()
  }, [])

  // handling filter key change
  useEffect(() => {
    filterKey === '*'
      ? isotope.current.arrange({filter: `*`})
      : isotope.current.arrange({filter: `${filterKey}`})
  }, [filterKey])

  const filterToggles = document.querySelectorAll(".filter-tag")

  function handleFilterKeyChange(key) {
    key === '*'
      ? setFilterKey('*')
      : setFilterKey(`.tag${key}`)
    filterToggles.forEach(tag => {
      tag.classList.contains(`bg-${key.toLowerCase()}`)
        ? tag.classList.remove("bg-transparent")
        : tag.classList.add("bg-transparent")
    })
  }

    return (
        <>
            <button id="filterToggle" className={`fixed z-50 right-4 top-6 sm:right-12 sm:top-12 bg-black p-2 ${showFilters ? "mt-5 sm:mt-0 sm:mr-80" : ""}`} onClick={toggleFilters}>
                <MdFilterList className="text-2xl sm:text-4xl text-white" />
            </button>
            <div id="storyFilters" className={`h-screen bg-white w-full max-w-full sm:w-96 fixed z-40 top-0 -right-full sm:-right-96 overflow-x-hidden p-12 border-l-[3px] ${showFilters ? "mr-[100%] sm:mr-96" : ""}`}>
                <h1 className="text-3xl font-display uppercase">Filters</h1>
                <h2 className="text-2xl font-display mt-8 flex flex-row items-center">Characters <CgCloseR className="ml-2 text-3xl text-slate-400 hover:text-black" onClick={() => handleFilterKeyChange('*')} /></h2>
                <div className="filter-group max-w-full grid grid-cols-4 mt-4 gap-y-4 sm:gap-2" data-filter-group="hero">
                {heroes.map((h, i) => (
                    <a key={i} className={`filter-tag w-16 h-16 flex justify-center items-center rounded-full bg-${h.toLowerCase()} bg-transparent`}
                      onClick={() => handleFilterKeyChange(h)}>
                        <Image
                            src={`/images/chibi/${h.toLowerCase()}.png`}
                            alt={h}
                            width={66}
                            height={60}
                        />
                    </a>
                ))}
                </div>
            </div>
        </>
    )
}