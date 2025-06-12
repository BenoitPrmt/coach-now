import type {TimeDuration} from "~/types/Time";

const timeAgo = (dateString: string): string => {
    const now = new Date();
    const date = new Date(dateString);
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diff < 60) return `il y a ${diff} seconde${diff > 1 ? 's' : ''}`;
    const minutes = Math.floor(diff / 60);
    if (minutes < 60) return `il y a ${minutes} minute${minutes > 1 ? 's' : ''}`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `il y a ${hours} heure${hours > 1 ? 's' : ''}`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `il y a ${days} jour${days > 1 ? 's' : ''}`;
    const months = Math.floor(days / 30);
    if (months < 12) return `il y a ${months} mois`;
    const years = Math.floor(months / 12);
    return `il y a ${years} an${years > 1 ? 's' : ''}`;
}

const formatDate = (date: Date) =>
  date.toLocaleDateString("fr-FR", {
    weekday: "short",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

const formatDateWithTime = (date: Date) =>
    date.toLocaleDateString("fr-FR", {
        weekday: "short",
        day: "2-digit",
        month: "long",
        year: "numeric",
    }) + ' à ' + date.toLocaleTimeString("fr-FR", {
        hour: '2-digit',
        minute: '2-digit'
    });

const formatDateTimeForAPI = (date: Date): string => {
    return date.toISOString().split("T")[0] + " " + date.toTimeString().split(" ")[0]
}

const displayDuration = (hours: number, minutes: number) => {
    if (hours === 0 && minutes === 0) return "0min";

    return new Intl.NumberFormat('fr-FR', {
        minimumIntegerDigits: 1,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(hours) + 'h' + (minutes > 0 ? minutes : '');
};

const getDurationFromDate = (startDate: Date, endDate: Date): TimeDuration => {
    const durationMs = endDate.getTime() - startDate.getTime();
    const totalMinutes = Math.floor(durationMs / 60000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return {
        hours,
        minutes
    };
}

export {timeAgo, formatDate, formatDateWithTime, formatDateTimeForAPI, displayDuration, getDurationFromDate};