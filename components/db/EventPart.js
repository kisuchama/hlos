import Cameo from "../Cameo";
import Link from "next/link";
import { CgExternal } from "react-icons/cg";
import { MdCircle } from "react-icons/md";

export default function EventPart({part}) {
  // part to string
  const pt = part.part.toString();

  // get cameos in part
  const partCameos = []
  for (let i = 0; i < part.cameos.length; i++) {
    partCameos.push('tag' + part.cameos[i].hero.name);
  }

  return (
    <div className={`flex flex-row justify-start w-full items-center space-x-4 font-display text-2xl lg:text-4xl h-16 lg:h-20 py-2 bg-white hover:bg-slate-100 ${partCameos.join(' ')}`}>
      {/* <span className="text-5xl w-8">+</span> */}
      <span className="font-bold w-12 lg:w-16">{pt}</span>
      <div className="hidden lg:flex flex-row items-center mt-1 grow">
        {part.cameos.map((c, i) => (
          <div key={i}>
              {c.hero.chibi ? (
                  <Cameo cameo={c} />
              ) : (<></>)}
          </div>
        ))}
      </div>
      <div className="flex lg:hidden flex-row items-center grow">
        {part.cameos.map((c, i) => (
          <div key={i}>
            {c.hero.chibi ? (
              <Link href={`/hlos/chara/${c.hero.name.toLowerCase()}`}><a>
                <MdCircle className={`text-${c.hero.name.toLowerCase()}`} />
              </a></Link>
            ) : (<></>)}
          </div>
        ))}
      </div>
      <a className="hover:text-red-600 transition" href={`${part.translation[0] ? (part.translation[0].link) : ('')}`}><CgExternal /></a>
    </div>
  )
}