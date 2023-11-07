import { Router } from "express"
import * as sectionsValidation from "../validations/sections.validation"
import validation from "../middlewares/validation.middleware"
import { Logger } from '../utility/logger';
import SectionServices from "../services/section.services";
import { permissionMiddleware } from "../middlewares/permission.middleware";
import SectionController from "../controllers/sections.controllers";
import SectionRepository from "../repositories/section.repository";

const sectionsRouter = Router();

const sectionController: SectionController = new SectionController(
    new SectionServices(new SectionRepository())
)

sectionsRouter.get(
    "/",
    validation(sectionsValidation.getManySchema, "query"),
    sectionController.getSectionsHandler.bind(sectionController)
)

sectionsRouter.get(
    "/:id",
    sectionController.getSectionHandler.bind(sectionController)
)

sectionsRouter.post(
    "/",
    validation(sectionsValidation.createSectionSchema),
    sectionController.createSectionHandler.bind(sectionController)
)

sectionsRouter.delete(
    "/:id",
    sectionController.deleteHandler.bind(sectionController)
)

sectionsRouter.put(
    "/:id",
    validation(sectionsValidation.updateSectionSchema),
    sectionController.updateSectionHandler.bind(sectionController)
)

export default sectionsRouter;