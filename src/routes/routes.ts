import { UserController } from "../controller/UserController";
import { AdminController } from "../controller/AdminController";

export const routes = [
  // User routes
  {
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all",
  },
  {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one",
  },
  {
    method: "post",
    route: "/users/register",
    controller: UserController,
    action: "register",
  },
  {
    method: "post",
    route: "/users/login", 
    controller: UserController,
    action: "login",
  },
  {
    method: "post",
    route: "/users/forgot-password", 
    controller: UserController,
    action: "forgotPassword",
  },
  {
    method: "post",
    route: "/users/reset-password",
    controller: UserController,
    action: "resetPassword",
  },
  {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove",
    // middleware: [userAuth], // Removed authentication middleware
  },
  {
    method: "get",
    route: "/users/me", // Route to get the logged-in user's profile
    controller: UserController,
    action: "getUserProfile",
    // middleware: [userAuth], // Removed authentication middleware
  },

  // Admin routes
  {
    method: "get",
    route: "/admin/users",
    controller: AdminController,
    action: "getAllUsers",
    // middleware: [userAuth], // Removed authentication middleware
  },
  {
    method: "get",
    route: "/admin/users/:id",
    controller: AdminController,
    action: "getUserById",
    // middleware: [userAuth], // Removed authentication middleware
  },
  {
    method: "delete",
    route: "/admin/users/:id",
    controller: AdminController,
    action: "deleteUser",
    // middleware: [userAuth], // Removed authentication middleware
  },
];
