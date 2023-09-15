import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.locale("fr-FR");
dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);

export class DateHumanizer {
    static fromNow(day: DateInput) {
        return dayjs(day).fromNow();
    }

    static lastConnection(date: DateInput) {
        const now = dayjs();
        const diff = now.diff(dayjs(date));

        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(diff / (1000 * 60));
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30.4375));
        const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));

        if (seconds < 60) {
            return `${seconds}s`;
        } else if (minutes < 60) {
            return `${minutes} m`;
        } else if (hours < 24) {
            return `${hours}h`;
        } else if (days < 30) {
            return `${days}j`;
        } else if (months < 12) {
            return `${months} mois`;
        } else {
            return `${years} ans`;
        }
    }

    static messageDate(date: DateInput) {
        const now = dayjs();
        const messageMoment = dayjs(date);
        const diff = now.diff(messageMoment, "days");

        if (diff < 1) return messageMoment.format("HH:mm");
        if (diff < 7) return messageMoment.format("ddd");
        return messageMoment.format("YYYY");
    }
}

type DateInput = string | Date;
