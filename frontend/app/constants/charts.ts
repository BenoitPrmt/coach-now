const COACH_DASHBOARD_CHART_CONFIG = {
    bookings: {
        label: "Réservations",
    },
    earnings: {
        label: "Revenus (€)",
        color: "var(--primary)",
    },
    count: {
        label: "Nombre",
        color: "hsl(var(--muted-foreground))",
    },
} as const;

export {
    COACH_DASHBOARD_CHART_CONFIG,
}