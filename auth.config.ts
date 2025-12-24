import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: "/admin/login",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isAdminPage = nextUrl.pathname.startsWith("/admin");
            const isLoginPage = nextUrl.pathname === "/admin/login";

            if (isAdminPage) {
                if (isLoginPage) return true;
                // Redirect unauthenticated users to login page
                if (!isLoggedIn) return false;

                // Check for admin role (if needed, though middleware usually just checks session existence initially)
                // For stricter role checks, you might do this inside the page or layout.
                return true;
            }
            return true;
        },
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
