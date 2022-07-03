import { parseISO, format } from "date-fns";

export default function Date({ dateString }) {
  const date = parseISO(dateString);
  return <time  className="text-slate-400 uppercase text-sm mx-2" dateTime={dateString}>{format(date, 'd LLL yyyy')}</time>;
}