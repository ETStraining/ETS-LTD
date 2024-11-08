import { Router } from "express";
import { UserController } from "../controller/UserController"; // Ensure this path is correct
import { authenticateJWT } from "../middleware/userAuth"; // Ensure this path is correct

const router = Router();
const userController = new UserController();

// Public routes
router.post("/register", userController.register.bind(userController));
router.post("/login", userController.login.bind(userController));

// Protected routes
router.get("/profile", authenticateJWT, userController.getUserProfile.bind(userController)); // Changed to get the current user's profile
router.get("/", authenticateJWT, userController.all.bind(userController)); // Get all users
router.get("/:id", authenticateJWT, userController.one.bind(userController)); // Get user by ID
router.delete("/:id", authenticateJWT, userController.remove.bind(userController)); // Remove user by ID

export default router;
