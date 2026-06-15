import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/menu",
    "/menu/(.*)",
    "/about",
    "/locations",
    "/contact",
    "/order",
    "/checkout",
    "/sign-in",
    "/sign-up",
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
