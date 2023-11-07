// src/controllers/userController.ts
import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../utility/responseHelpers";
import { ISectionServices } from "../services/section.services";

export default class SectionController {

    private sectionServices: ISectionServices

    constructor(sectionServices: ISectionServices) {
        this.sectionServices = sectionServices
    }

    async createSectionHandler(req: Request, res: Response, next: NextFunction) {

        try {

            const section = await this.sectionServices.createSection(req.body);

            sendResponse(res, {
                message: "section is created successfully",
                section
            }, 201)

        } catch (error) {
            next(error)
        }

    }

    async getSectionsHandler(req: Request, res: Response, next: NextFunction) {

        try {

            const { limit = 10, page = 1, ...others } = req.query

            const sections = await this.sectionServices.getSections({
                data: others,
                options: {
                    limit: +limit,
                    page: +page
                }
            });

            sendResponse(res, {
                sections
            }, 200)

        } catch (error) {
            next(error)
        }

    }

    async getSectionHandler(req: Request, res: Response, next: NextFunction) {

        try {

            const { id } = req.params

            const entity = await this.sectionServices.getSection({ id: +id });

            sendResponse(res, {
                entity
            }, 200)

        } catch (error) {
            next(error)
        }

    }

    async deleteHandler(req: Request, res: Response, next: NextFunction) {

        try {

            const { id } = req.params;

            await this.sectionServices.deleteSection(+id);

            sendResponse(res, {}, 200)

        } catch (error) {
            next(error)
        }

    }

    async updateSectionHandler(req: Request, res: Response, next: NextFunction) {

        try {

            const { id } = req.params

            const section = await this.sectionServices.updatedSection({
                ...req.body,
                id: +id
            });

            sendResponse(res, { section }, 200)

        } catch (error) {
            next(error)
        }

    }
}
