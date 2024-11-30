import { ContactController } from "../controller/ContactController";
import { validationMiddleware } from "../middleware/contactVal";
import { ContactDTO } from "../dto/ContactDTO";

export const routes = [
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
