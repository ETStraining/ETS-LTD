import { UserController } from "./controller/UserController";
import { ContactController } from "./controller/ContactController";

export const Routes = [
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
        route: "/users",
        controller: UserController,
        action: "save"
    },
    {
        method: "delete",
        route: "/users/:id",
        controller: UserController,
        action: "remove"
    },
    {
        method: "get",
        route: "/contacts",
        controller: ContactController,
        action: "all"
    },
    {
        method: "get",
        route: "/contacts/:id",
        controller: ContactController,
        action: "one"
    },
    {
        method: "post",
        route: "/contacts",
        controller: ContactController,
        action: "save"
    },
    {
        method: "delete",
        route: "/contacts/:id",
        controller: ContactController,
        action: "remove"
    }
];
