/** ⚠️ Changed the route logic ⚠️
 * /users => Only accessible by USER or ADMIN
 * /coachs => Only accessible by COACH or ADMIN
 * /admins => Only accessible by ADMIN
 * /authenticated => Authenticated routes
 * /unauthenticated => Public routes (not available when authenticated)
 * / => Public routes
 * **/
import {type RouteConfig, index, route, layout, prefix} from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("about", "routes/about.tsx"),

    layout("routes/users/layout.tsx", [
        route("coachs", "routes/users/coachs.tsx"),
        ...prefix("coach", [
            route(":coachId", "routes/users/coach/profile.tsx"),
            route("dashboard", "routes/users/coach/dashboard.tsx"),
        ]),
    ]),

    layout("routes/coachs/layout.tsx", [
        route("dashboard", "routes/coachs/dashboard.tsx"),
    ]),

    ...prefix("admin", [
        index("routes/admins/dashboard.tsx"),
        layout("routes/admins/layout.tsx", [
            route("users", "routes/admins/users.tsx"),
            route("coachs", "routes/admins/coachs.tsx"),
            route("bookings", "routes/admins/bookings.tsx"),
        ]),
    ]),

    layout("routes/authenticated/layout.tsx", [
        route("account", "routes/authenticated/account.tsx"),
    ]),

    layout("routes/unauthenticated/layout.tsx", [
        route("login", "routes/unauthenticated/login.tsx"),
        route("register", "routes/unauthenticated/register.tsx"),
    ]),
] satisfies RouteConfig;
