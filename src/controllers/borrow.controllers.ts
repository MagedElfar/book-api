// src/controllers/userController.ts
import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../utility/responseHelpers";
import { ISectionServices } from "../services/section.services";
import { IRowServices } from "../services/row.services";
import { IBorrowServices } from "../services/borrow.services";

export default class BorrowController {

    private borrowServices: IBorrowServices

    constructor(borrowServices: IBorrowServices) {
        this.borrowServices = borrowServices
    }

    async borrowHandler(req: Request, res: Response, next: NextFunction) {
        try {

            const row = await this.borrowServices.borrowBook({
                ...req.body,
                user_id: req.user?.id
            });

            sendResponse(res, {
                message: "new borrow is created successfully",
            }, 201)

        } catch (error) {
            next(error)
        }

    }

    async returnBookHandler(req: Request, res: Response, next: NextFunction) {
        try {

            const { id } = req.params;

            const borrow = await this.borrowServices.returnBook({
                id: +id,
                user_id: req.user?.id!
            });

            sendResponse(res, {
                message: "book returned",
                borrow
            }, 200)

        } catch (error) {
            next(error)
        }

    }

    async getUserBorrowsHandler(req: Request, res: Response, next: NextFunction) {

        try {

            const { limit = 10, page = 1 } = req.query

            const sections = await this.borrowServices.getBorrows({
                data: { user_Id: req.user?.id, return_date: null },
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

    // async getRowHandler(req: Request, res: Response, next: NextFunction) {

    //     try {

    //         const { id } = req.params

    //         const entity = await this.rowServices.getRow({ id: +id });

    //         sendResponse(res, {
    //             entity
    //         }, 200)

    //     } catch (error) {
    //         next(error)
    //     }

    // }

    // async deleteHandler(req: Request, res: Response, next: NextFunction) {

    //     try {

    //         const { id } = req.params;

    //         await this.rowServices.deleteRow(+id);

    //         sendResponse(res, {}, 200)

    //     } catch (error) {
    //         next(error)
    //     }

    // }
}
