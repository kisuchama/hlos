import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Header from "./Header";
import { CgArrowLeft } from "react-icons/cg";
import { FaBan } from "react-icons/fa";

export const siteTitle = "/ hlos";

export default function Layout({ children, home, event, pageTitle }) {
  return (
    <div>
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
        <title>
          {siteTitle}
          {pageTitle ? (
            ` / ${pageTitle}`
          ) : ('')}
        </title>
      </Head>
      <Header page={pageTitle}></Header>
      <main className="container mx-auto pt-16 pb-4 mt-2 sm:mt-12 mb-24">{children}</main>
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
