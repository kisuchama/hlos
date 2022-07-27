import Cameo, { DotCameo } from "../Cameo";
import { CgExternal } from "react-icons/cg";

export default function EventPart({part}) {
  // part to string
  const pt = part.part.toString();

  // get cameos in part
  const partCameos = []
  for (let i = 0; i < part.cameos.length; i++) {
    partCameos.push('tag' + part.cameos[i].hero.name);
  }

  return (
    <a href={part.translation[0] ? part.translation[0].link : undefined}>
      <div className={`flex flex-row justify-start w-full items-center space-x-4 font-display text-2xl lg:text-4xl h-8 lg:h-16 py-2 hover:bg-slate-100 ${partCameos.join(' ')}`}>
        {/* <span className="text-5xl w-8">+</span> */}
        <span className="font-bold w-8 lg:w-16">{pt}</span>
        <div className="hidden lg:flex flex-row items-center mt-2 grow">
          {part.cameos.map((c, i) => (
            <div key={i}>
                {c.hero.chibi ? (
                    <Cameo cameo={c} w={55} h ={50} />
                ) : (<></>)}
            </div>
          ))}
        </div>
        <div className="flex lg:hidden flex-row items-center grow">
          {part.cameos.map((c, i) => (
            <div key={i}>
              {c.hero.chibi ? (
                <DotCameo cameo={c} />
              ) : (<></>)}
            </div>
          ))}
        </div>
        {part.translation[0] ? <CgExternal /> : <></>}
      </div>
    </a>
  )
}