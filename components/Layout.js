import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { CgArrowLeft } from "react-icons/cg";
import { FaBan } from "react-icons/fa";

export const siteTitle = "/ hlos";

export default function Layout({ children, home, event }) {
  return (
    <div className="container mx-auto py-4 mt-2 sm:mt-12 mb-24">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Helios Rising Heroes ENG database"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={`キス.moe ${siteTitle}`} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className="flex flex-col items-center">
        {home ? (
          <>
            {/* <Image
              priority
              src="/images/profile.jpg"
              className="rounded-full"
              height={144}
              width={144}
              alt={name}
            /> */}
            <div className="relative w-32 h-32 logo transition-transform duration-500">
              <FaBan className="text-9xl text-red-600 rotate-90 absolute top-0 left-0" />
              <FaBan className="text-9xl text-gold-400 absolute top-0 left-0" />
            </div>
            <h1 className="text-4xl font-display tracking-tighter leading-loose my-4 -ml-4">{siteTitle}</h1>
          </>
        ) : (
          <>
            {/* <Link href="/">
              <a>
                <Image
                  priority
                  src="/images/profile.jpg"
                  className="rounded-full"
                  height={108}
                  width={108}
                  alt={name}
                />
              </a>
            </Link>
            <h2 className="text-2xl leading-6 my-4">
              <Link href="/">
                <a className="text-inherit">{name}</a>
              </Link>
            </h2> */}
          </>
        )}
      </header>
      <main>{children}</main>
      {event && (
        <div className="mt-12 flex flex-row items-center justify-start">
          <CgArrowLeft className="inline-block mr-2"/>
          <Link href="/hlos/event">
            <a className="link-underline font-display">Back to event index</a>
          </Link>
        </div>
      )}
      {!home && !event && (
        <div className="mt-12 flex flex-row items-center justify-start">
          <CgArrowLeft className="inline-block mr-2"/>
          <Link href="/hlos">
            <a className="link-underline font-display">Back to home</a>
          </Link>
        </div>
      )}
    </div>
  );
}
