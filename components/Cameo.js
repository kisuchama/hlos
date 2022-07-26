import Link from "next/link";
import Image from "next/image";
import { MdCircle } from "react-icons/md";

export default function Cameo({ cameo, w = "66", h = "60" }) {
  return (
    <Link href={`/hlos/chara/${cameo.hero.name.toLowerCase()}`}>
      <a className="h-56px w-62px">
        <Image
          src={`/images/chibi/${cameo.hero.name.toLowerCase()}.png`}
          alt={cameo.hero.name}
          width={w}
          height={h}
        />
      </a>
    </Link>
  );
}

export function DotCameo({ cameo }) {
  return (
    <Link href={`/hlos/chara/${cameo.hero.name.toLowerCase()}`}>
      <a>
        <MdCircle className={`text-${cameo.hero.name.toLowerCase()}`} />
      </a>
    </Link>
  );
}
