/** ⚠️ Changed the route logic ⚠️
 * /admins => Only accessible by ADMIN
 * /coachs => Only accessible by COACH or ADMIN
 * /users => Only accessible by USER or ADMIN
 * /unauthenticated => Public routes (not available when authenticated)
 * / => Public routes
 * **/
import {type RouteConfig, index, route, layout, prefix} from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("about", "routes/about.tsx"),

    layout("routes/unauthenticated/layout.tsx", [
        route("login", "routes/unauthenticated/login.tsx"),
        route("register", "routes/unauthenticated/register.tsx"),
    ]),

    layout("routes/users/layout.tsx", [
        route("coachs", "routes/users/coachs.tsx"),
        route("account", "routes/users/user/account.tsx"),
        ...prefix("coach", [
            route(":coachId", "routes/users/coach/profile.tsx"),
        ]),
    ]),

    // layout("routes/coachs/layout.tsx", []),


    ...prefix("admin", [
        layout("routes/admins/layout.tsx", [
            route("users", "routes/admins/users.tsx"),
        ]),
    ]),
] satisfies RouteConfig;
