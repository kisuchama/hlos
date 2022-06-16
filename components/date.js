import { parseISO, format } from "date-fns";

export default function Date({ dateString }) {
  const date = parseISO(dateString);
  return <time  className="text-sm text-slate-500 uppercase mx-2" dateTime={dateString}>{format(date, 'd LLL yyyy')}</time>;
}