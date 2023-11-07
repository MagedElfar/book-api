// src/controllers/userController.ts
import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../utility/responseHelpers";
import { ISectionServices } from "../services/section.services";
import { IRowServices } from "../services/row.services";

export default class RowController {

    private rowServices: IRowServices

    constructor(rowServices: IRowServices) {
        this.rowServices = rowServices
    }

    async createRowsHandler(req: Request, res: Response, next: NextFunction) {

        try {

            const row = await this.rowServices.createRow(req.body);

            sendResponse(res, {
                message: "row is created successfully",
                row
            }, 201)

        } catch (error) {
            next(error)
        }

    }

    async getRowsHandler(req: Request, res: Response, next: NextFunction) {

        try {

            const { limit = 10, page = 1, ...others } = req.query

            const sections = await this.rowServices.getRows({
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

    async getRowHandler(req: Request, res: Response, next: NextFunction) {

        try {

            const { id } = req.params

            const entity = await this.rowServices.getRow({ id: +id });

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

            await this.rowServices.deleteRow(+id);

            sendResponse(res, {}, 200)

        } catch (error) {
            next(error)
        }

    }
}
