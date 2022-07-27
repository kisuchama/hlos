import { parseISO, format } from "date-fns";

export default function Date({ dateString, long }) {
  const date = parseISO(dateString);
  return (
    <time  className="text-slate-400 uppercase text-sm mx-2" dateTime={dateString}>
      {long ? (
        format(date, 'LLL dd, yyyy')
      ) : (
        format(date, 'LL.dd.yy')
      )}
    </time>
  );
}