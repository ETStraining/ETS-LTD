import { UserController } from "./controller/UserController";
import { AdminController } from "./controller/AdminController"; 
import { userAuth } from "./middleware/UserAuth";

export const Routes = [
    // User routes
    {
        method: "get",
        route: "/users",
        controller: UserController,
        action: "all"
    },
    {
        method: "get",
        route: "/users/:id",
        controller: UserController,
        action: "one"
    },
    {
        method: "post",
        route: "/users/register", // Registration route
        controller: UserController,
        action: "register"
    },
    {
        method: "post",
        route: "/users/login", // Login route
        controller: UserController,
        action: "login"
    },
    {
        method: "post",
        route: "/users/forgot-password", // Endpoint for requesting password reset
        controller: UserController,
        action: "forgotPassword"
    },
    {
        method: "post",
        route: "/users/reset-password", // Endpoint for resetting password
        controller: UserController,
        action: "resetPassword"
    },
    {
        method: "delete",
        route: "/users/:id",
        controller: UserController,
        action: "remove",
        middleware: [userAuth] // Protect this route
    },
    {
        method: "get",
        route: "/users/me", // Protected route to get the logged-in user's profile
        controller: UserController,
        action: "getUserProfile",
        middleware: [userAuth] // Protect this route
    },

    // Admin routes
    {
        method: "get",
        route: "/admin/users",
        controller: AdminController,
        action: "getAllUsers",
        middleware: [userAuth] // Protect this route
    },
    {
        method: "get",
        route: "/admin/users/:id",
        controller: AdminController,
        action: "getUserById",
        middleware: [userAuth] // Protect this route
    },
    {
        method: "delete",
        route: "/admin/users/:id",
        controller: AdminController,
        action: "deleteUser",
        middleware: [userAuth] // Protect this route
    }
];
