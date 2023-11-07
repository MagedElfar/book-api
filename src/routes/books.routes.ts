import { Router } from "express"
import * as bookValidation from "../validations/book.validations"
import validation from "../middlewares/validation.middleware"
import SectionServices from "../services/section.services";
import SectionRepository from "../repositories/section.repository";
import BookController from "../controllers/book.controllers";
import BookServices from "../services/book.services";
import BookRepository from "../repositories/book.repository";
import RowServices from "../services/row.services";
import RowRepository from "../repositories/row.repository";

const booksRouter = Router();

const bookController: BookController = new BookController(
    new BookServices(
        new RowServices(
            new SectionServices(new SectionRepository()),
            new RowRepository()
        ),
        new BookRepository()
    )
)

booksRouter.get(
    "/",
    validation(bookValidation.getManySchema, "query"),
    bookController.getBooksHandler.bind(bookController)
)

booksRouter.get(
    "/:id",
    bookController.getBookHandler.bind(bookController)
)

booksRouter.post(
    "/",
    validation(bookValidation.createBookSchema),
    bookController.createBookHandler.bind(bookController)
)

booksRouter.delete(
    "/:id",
    bookController.deleteHandler.bind(bookController)
)

booksRouter.put(
    "/:id",
    validation(bookValidation.updateBookSchema),
    bookController.updateBookHandler.bind(bookController)
)

export default booksRouter;