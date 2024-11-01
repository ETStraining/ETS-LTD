import { ContactController } from "./controller/ContactController";

export const Routes = [
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
        method: "put",
        route: "/contacts/:id",
        controller: ContactController,
        action: "update"
    },
    {
        method: "delete",
        route: "/contacts/:id",
        controller: ContactController,
        action: "remove"
    }
];
