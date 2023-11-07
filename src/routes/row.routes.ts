import { Router } from "express"
import * as rowsValidation from "../validations/row.validation"
import validation from "../middlewares/validation.middleware"
import SectionServices from "../services/section.services";
import SectionRepository from "../repositories/section.repository";
import RowController from "../controllers/row.controllers";
import RowServices from "../services/row.services";
import RowRepository from "../repositories/row.repository";

const rowsRouter = Router();

const rowController: RowController = new RowController(
    new RowServices(
        new SectionServices(new SectionRepository()),
        new RowRepository()
    )
)

rowsRouter.get(
    "/",
    validation(rowsValidation.getManySchema, "query"),
    rowController.getRowsHandler.bind(rowController)
)

rowsRouter.get(
    "/:id",
    rowController.getRowHandler.bind(rowController)
)

rowsRouter.post(
    "/",
    validation(rowsValidation.createRowSchema),
    rowController.createRowsHandler.bind(rowController)
)

rowsRouter.delete(
    "/:id",
    rowController.deleteHandler.bind(rowController)
)


export default rowsRouter;