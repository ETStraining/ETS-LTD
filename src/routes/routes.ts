import { UserController } from "../controller/UserController";
import { AdminController } from "../controller/AdminController";
import { ContactController } from "../controller/ContactController";
import { validationMiddleware } from "../middleware/contactVal";
import { ContactDTO } from "../dto/ContactDTO";
import {ServiceController} from "../controller/serviceController";
import {CourseController} from "../controller/CourseController";

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

    // Service routes
  {
    method: "get",
    route: "/services",
    controller: ServiceController,
    action: "all"
  },
  {
    method: "post",
    route: "/services",
    controller: ServiceController,
    action: "create"
  },
  {
    method: "get",
    route: "/services/:id",
    controller: ServiceController,
    action: "findService"
  },
  {
    method: "put",
    route: "/services/:id",
    controller: ServiceController,
    action: "update"
  },
  {
    method: "delete",
    route: "/services/:id",
    controller: ServiceController,
    action: "remove"
  },

    //Course routes
  {
    method: "post",
    route: "/courses",
    controller: CourseController,
    action: "create"
  },
  {
    method: "get",
    route: "/courses",
    controller: CourseController,
    action: "all"
  },
  {
    method: "get",
    route: "/courses/:id",
    controller: CourseController,
    action: "findCourse"
  },
  {
    method: "put",
    route: "/courses/:id",
    controller: CourseController,
    action: "update"
  },
  {
    method: "delete",
    route: "/courses/:id",
    controller: CourseController,
    action: "remove"
  },


  {
    method: "get",
    route: "/contacts",
    controller: ContactController,
    action: "getAll",
  },
  {
    method: "get",
    route: "/contacts/:id",
    controller: ContactController,
    action: "getOne",
  },
  {
    method: "post",
    route: "/contacts",
    controller: ContactController,
    action: "create",
    middleware: validationMiddleware(ContactDTO), // Apply validation middleware
  },
  {
    method: "put",
    route: "/contacts/:id",
    controller: ContactController,
    action: "update",
    middleware: validationMiddleware(ContactDTO), // Apply validation middleware
  },
  {
    method: "delete",
    route: "/contacts/:id",
    controller: ContactController,
    action: "delete",
  },
];


