import { index, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  route("feedback", "routes/feedback.tsx"),

  route("sports", "routes/sports.tsx"),

  route("attendance", "routes/attendance.tsx"),
] satisfies RouteConfig;