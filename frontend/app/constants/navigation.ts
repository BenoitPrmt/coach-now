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
]

export {
    navigation
}