import { Router } from "express"
import { permissionMiddleware } from "../middlewares/permission.middleware";
import authRoutes from "./auth.routes"
import userRoutes from "./user.routes"
import unHandelRouter from "./unHandel.routes";
import authMiddleware from "../middlewares/auth.middleware";
import entitiesRouter from "./sections.routes";
import rowsRouter from "./row.routes";
import booksRouter from "./books.routes";
import borrowRouter from "./borrows.routers";


const router = Router();

router.use("/auth", authRoutes)
router.use("/users", authMiddleware.authenticate, userRoutes)
router.use("/sections", authMiddleware.authenticate, permissionMiddleware, entitiesRouter)
router.use("/rows", authMiddleware.authenticate, permissionMiddleware, rowsRouter)
router.use("/books", authMiddleware.authenticate, booksRouter)
router.use("/borrows", authMiddleware.authenticate, borrowRouter)
router.use("/*", unHandelRouter)

export default router;