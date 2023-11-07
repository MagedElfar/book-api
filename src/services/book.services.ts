import { BadRequestError, ForbiddenError, NotFoundError } from "../utility/errors";
import { GetManyDto } from "../repositories/genericRepository";
import { BookAttributes } from "../models/book.model";
import { IRowServices } from "./row.services";
import BookRepository from "../repositories/book.repository";
import { CreateBookDto, DeleteBookDto, UpdateBookDto } from "../dto/book.dto";


export interface IBookServices {
    createBook(createBookDto: CreateBookDto): Promise<BookAttributes>;
    getBooks(getManyDto: GetManyDto): Promise<any>;
    deleteBooks(deleteBookDto: DeleteBookDto): Promise<void>
    updatedBook(updateBookDto: UpdateBookDto): Promise<BookAttributes | null>
    updatedQty(updateBookDto: UpdateBookDto): Promise<BookAttributes | null>
    getBook(bookAttributes: Partial<BookAttributes>): Promise<BookAttributes | null>
    getBookByID(id: number): Promise<BookAttributes | null>
}

export default class BookServices implements IBookServices {

    private readonly rowServices: IRowServices;
    private readonly bookRepository: BookRepository;


    constructor(rowServices: IRowServices, bookRepository: BookRepository) {
        this.rowServices = rowServices;
        this.bookRepository = bookRepository
    }

    private bookPermission(book: BookAttributes, userId: number, userRole: string): void {

        if (book.user_id !== userId && userRole !== "admin") throw new ForbiddenError()

        return
    }

    async getBooks(getManyDto: GetManyDto): Promise<any> {
        try {

            const data = await this.bookRepository.findMany(getManyDto)

            return data
        } catch (error) {
            throw error
        }
    }

    async getBook(bookAttributes: Partial<BookAttributes>): Promise<BookAttributes | null> {
        try {

            const book = await this.bookRepository.findOne(bookAttributes);

            return book;
        } catch (error) {
            throw error
        }
    }

    async getBookByID(id: number): Promise<BookAttributes | null> {
        try {

            const book = await this.bookRepository.findById(id);

            return book;
        } catch (error) {
            throw error
        }
    }


    async createBook(createBookDto: CreateBookDto): Promise<BookAttributes> {
        try {

            const row = await this.rowServices.getRowByID(createBookDto.row_id);

            if (!row) throw new NotFoundError("shelf location isn't exist");

            let book = await this.bookRepository.findOne({ ISBN: createBookDto.ISBN });

            if (book) throw new BadRequestError("ISBN should be unique")

            return await this.bookRepository.create(createBookDto);
        } catch (error) {
            throw error
        }
    }

    async deleteBooks(deleteBookDto: DeleteBookDto): Promise<void> {
        try {

            let book = await this.getBookByID(deleteBookDto.id);

            if (!book) throw new NotFoundError("book not found");

            this.bookPermission(book, deleteBookDto.user_id!, deleteBookDto.userRole)

            await this.bookRepository.delete({ id: deleteBookDto.id })

            return;
        } catch (error) {
            throw error
        }
    }

    async updatedBook(updateBookDto: UpdateBookDto): Promise<BookAttributes | null> {
        const { id, userRole, user_id, ...updateData } = updateBookDto
        try {

            let book = await this.getBookByID(id);

            if (!book) throw new NotFoundError("book not found");

            this.bookPermission(book, user_id!, userRole)

            if (updateBookDto.ISBN) {

                const book = await this.getBook({ ISBN: updateBookDto.ISBN });

                if (book && book.id !== id) throw new BadRequestError("ISBN should be unique")

            }

            if (updateBookDto.row_id) {

                const row = await this.rowServices.getRowByID(updateBookDto.row_id);

                if (!row) throw new NotFoundError("shelf location isn't exist");

            }


            return await this.bookRepository.update(id, updateData);

        } catch (error) {
            throw error
        }
    }

    async updatedQty(updateBookDto: UpdateBookDto): Promise<BookAttributes | null> {
        const { id, userRole, user_id, ...updateData } = updateBookDto
        try {

            return await this.bookRepository.update(id, { qty: updateBookDto.qty });

        } catch (error) {
            throw error
        }
    }
}
