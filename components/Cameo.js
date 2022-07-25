import Link from "next/link"
import Image from "next/image"

export default function Cameo({ cameo }) {
    return (
      <Link href={`/hlos/chara/${cameo.hero.name.toLowerCase()}`}>
          <a className="h-56px w-62px">
              <Image
                  src={`/images/chibi/${cameo.hero.name.toLowerCase()}.png`}
                  alt={cameo.hero.name}
                  width={66}
                  height={60} 
              />
          </a>
      </Link>
    )
}

{/* <Link href={`/hlos/chara/${cameo.hero.name.toLowerCase()}`}>
    <a>
      <div className={`h-4 w-4 rounded-full bg-${cameo.hero.name.toLowerCase()}`}></div>
    </a>
</Link> */}