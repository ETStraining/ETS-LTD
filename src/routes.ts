import { ContactController } from "./controller/ContactController";
import { TrainingController } from "./controller/TrainingController"; 

export const Routes = [
    // Contact routes
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
    },

    // Training routes
    {
        method: "get",
        route: "/trainings",
        controller: TrainingController,
        action: "all"
    },
    {
        method: "get",
        route: "/trainings/:id",
        controller: TrainingController,
        action: "one"
    },
    {
        method: "post",
        route: "/trainings",
        controller: TrainingController,
        action: "save"
    },
    {
        method: "put",
        route: "/trainings/:id",
        controller: TrainingController,
        action: "update"
    },
    {
        method: "delete",
        route: "/trainings/:id",
        controller: TrainingController,
        action: "remove"
    }
];
