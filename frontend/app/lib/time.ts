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

export {timeAgo};