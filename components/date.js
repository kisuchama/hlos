import { parseISO, format } from "date-fns";

export default function Date({ dateString }) {
  console.log(dateString)
  const toDate = Date(dateString)
  const date =  parseISO(toDate);

  return <time className="text-sm text-slate-500 uppercase" dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>;
}