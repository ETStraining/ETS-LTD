import {ServiceController} from "../controller/serviceController"
export const serviceRoute=[
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
   }
]