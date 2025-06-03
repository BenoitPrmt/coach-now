import {type RouteConfig, index, route, layout, prefix} from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("coachs", "routes/coachs.tsx"),
] satisfies RouteConfig;
