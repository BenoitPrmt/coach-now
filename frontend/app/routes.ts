import {type RouteConfig, index, route, layout, prefix} from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("about", "routes/about.tsx"),
    route("coachs", "routes/coachs.tsx"),
    route("login", "routes/login.tsx"),
    route("register", "routes/register.tsx"),

    // Protected routes : need to be authenticated
    layout("routes/user/layout.tsx", [
        route("account", "routes/user/account.tsx"),
        ...prefix("coach", [
            route(":coachId", "routes/coach/profile.tsx"),
        ]),
    ]),

    // Protected routes : need to be ADMIN
    ...prefix("admin", [
        layout("routes/admin/layout.tsx", [
            route("users", "routes/admin/users.tsx"),
        ]),
    ]),

    // Protected routes : need to be COACH or ADMIN
    // ...prefix("coach", [
    //     layout("routes/coach/layout.tsx", [
    //         route(":coachId", "routes/coach/profile.tsx"),
    //     ]),
    // ]),
] satisfies RouteConfig;
