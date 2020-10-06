import { parse, format, formatDistanceToNow, differenceInDays } from "date-fns";

export const formatTimestamp = (ts) => {
  let time = parse(
    // remove millisecond suffix
    ts.replace(/\.[^.]*$/, ""),
    "yyyy-MM-dd HH:mm:ss",
    new Date()
  );

  if (differenceInDays(new Date(), time) < 4) {
    return formatDistanceToNow(time, { addSuffix: true });
  } else {
    return format(time, "d/M/Y");
  }
};
