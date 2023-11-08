import { Router } from "express"
import * as borrowValidation from "../validations/borrow.validations"
import validation from "../middlewares/validation.middleware"
import SectionServices from "../services/section.services";
import SectionRepository from "../repositories/section.repository";
import BookServices from "../services/book.services";
import BookRepository from "../repositories/book.repository";
import RowServices from "../services/row.services";
import RowRepository from "../repositories/row.repository";
import BorrowController from "../controllers/borrow.controllers";
import BorrowServices from "../services/borrow.services";
import BorrowRepository from "../repositories/borrow.repository";
import { permissionMiddleware } from "../middlewares/permission.middleware";

const borrowRouter = Router();

const borrowController: BorrowController = new BorrowController(
    new BorrowServices(
        new BookServices(
            new RowServices(
                new SectionServices(new SectionRepository()),
                new RowRepository()
            ),
            new BookRepository()
        ),

        new BorrowRepository()
    )

)

borrowRouter.get(
    "/",
    permissionMiddleware,
    validation(borrowValidation.getManyBorrow, "query"),
    borrowController.getBorrowsHandler.bind(borrowController)
)

borrowRouter.get(
    "/user",
    validation(borrowValidation.getManySchema, "query"),
    borrowController.getUserBorrowsHandler.bind(borrowController)
)

borrowRouter.get(
    "/overdue",
    permissionMiddleware,
    validation(borrowValidation.getManySchema, "query"),
    borrowController.getOverdueBorrowsHandler.bind(borrowController)
)

borrowRouter.post(
    "/",
    validation(borrowValidation.borrowBookSchema),
    borrowController.borrowHandler.bind(borrowController)
)

borrowRouter.put(
    "/:id",
    borrowController.returnBookHandler.bind(borrowController)
)

export default borrowRouter;