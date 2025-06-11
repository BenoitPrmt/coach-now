/*
* Page : Page Label
* URL : Page URL
* needsAuth : Does the page require authentication?
* links : Array of links with label and URL => Like an element on the page
* */
type NavigationOptions = {
    page: string;
    url: string;
    needsAuth?: boolean;
    hiddenWhenAuth?: boolean;
    isUser?: boolean;
    isAdmin?: boolean;
    isCoach?: boolean;
    links: {
        label: string;
        link: string;
    }[];
}[];


const navigation: NavigationOptions = [
    {
        page: "Accueil",
        url: "/",
        links: []
    },
    {
        page: "À propos",
        url: "/about",
        links: []
    },
    {
        page: "Coachs",
        url: "/coachs",
        isUser: true,
        links: []
    },
    {
        page: "Connexion",
        url: "/login",
        needsAuth: false,
        hiddenWhenAuth: true,
        links: []
    },
    {
        page: "Inscription",
        url: "/register",
        needsAuth: false,
        hiddenWhenAuth: true,
        links: []
    },
    {
        page: "Mon compte",
        url: "/account",
        needsAuth: true,
        links: []
    },
    {
        page: "Dashboard",
        url: "/dashboard",
        needsAuth: true,
        isCoach:true,
        links: []
    },
    {
        page: "Administration",
        url: "/admin",
        needsAuth: true,
        isAdmin: true,
        links: []
    }
]

export {
    navigation
}