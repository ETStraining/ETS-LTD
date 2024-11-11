import {CourseController} from "../controller/CourseController"

export const CourseRoute=[
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
   }


]

