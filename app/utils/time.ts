import moment from "moment";
import "moment/locale/sr";
import "moment/locale/en-gb";

// import { CONFIG } from "../config";

// if (CONFIG.LANGUAGE === "SRB") {
//   moment.locale("sr");
// }

// if (CONFIG.LANGUAGE === "ENG") {
//   moment.locale("en-gb");
// }

export const formatDate = (date: Date) => moment(date).format("DD.MM.YYYY.");
export const formatHour = (date: Date) => moment(date).format("DD.MM.YYYY. h:mm:ss");
export const formatDay = (date: Date) => moment(date).format("DD.MM.YYYY.");
export const formatDateTillNow = (date: Date) => moment(date).startOf("minute").fromNow();
export const todayDate = () => moment(new Date()).format("DD.MM.YYYY. h:mm:ss");
export const invoceTime = () => moment(new Date()).format("YYYY-MM");
