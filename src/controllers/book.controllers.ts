// src/controllers/userController.ts
import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../utility/responseHelpers";
import { ISectionServices } from "../services/section.services";
import { IBookServices } from "../services/book.services";
import { NotFoundError } from "../utility/errors";

export default class BookController {

    private bookServices: IBookServices

    constructor(bookServices: IBookServices) {
        this.bookServices = bookServices
    }

    async createBookHandler(req: Request, res: Response, next: NextFunction) {

        try {

            const user_id = req.user?.id

            const book = await this.bookServices.createBook({
                ...req.body,
                user_id
            });

            sendResponse(res, {
                message: "book is created successfully",
                book
            }, 201)

        } catch (error) {
            next(error)
        }

    }

    async getBooksHandler(req: Request, res: Response, next: NextFunction) {

        try {

            const { limit = 10, page = 1, ...others } = req.query

            const sections = await this.bookServices.getBooks({
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

    async getBookHandler(req: Request, res: Response, next: NextFunction) {

        try {

            const { id } = req.params

            const book = await this.bookServices.getBook({ id: +id });

            if (!book) throw new NotFoundError()

            sendResponse(res, {
                book
            }, 200)

        } catch (error) {
            next(error)
        }

    }

    async deleteHandler(req: Request, res: Response, next: NextFunction) {

        try {

            const { id } = req.params;

            await this.bookServices.deleteBooks({
                id: +id,
                user_id: req.user?.id,
                userRole: req.user?.role!
            });

            sendResponse(res, {}, 200)

        } catch (error) {
            next(error)
        }

    }

    async updateBookHandler(req: Request, res: Response, next: NextFunction) {

        try {

            const { id } = req.params

            const section = await this.bookServices.updatedBook({
                ...req.body,
                id: +id,
                user_id: req.user?.id,
                userRole: req.user?.role
            });

            sendResponse(res, { section }, 200)

        } catch (error) {
            next(error)
        }

    }
}
