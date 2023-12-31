import moment from 'moment';
import { BadRequestError, ForbiddenError, NotFoundError } from "../utility/errors";
import { BorrowBookDto, ReturnBookDto } from "../dto/borrow.dto";
import { BorrowAttributes } from "../models/borrow.model";
import { IBookServices } from "./book.services";
import BorrowRepository from "../repositories/borrow.repository";
import { GetManyDto } from '../repositories/genericRepository';


export interface IBorrowServices {
    borrowBook(borrowBookDto: BorrowBookDto): Promise<BorrowAttributes>;
    getBorrows(getManyDto: GetManyDto): Promise<any>;
    getBorrow(borrowAttributes: Partial<BorrowAttributes>): Promise<BorrowAttributes | null>
    getBorrowByID(id: number): Promise<BorrowAttributes | null>
    returnBook(returnBookDto: ReturnBookDto): Promise<BorrowAttributes | null>
}

export default class BorrowServices implements IBorrowServices {

    private readonly bookServices: IBookServices;
    private readonly borrowRepository: BorrowRepository;


    constructor(bookServices: IBookServices, borrowRepository: BorrowRepository) {
        this.bookServices = bookServices;
        this.borrowRepository = borrowRepository
    }

    async getBorrows(getManyDto: GetManyDto): Promise<any> {
        try {

            const data = await this.borrowRepository.findMany(getManyDto)

            return data
        } catch (error) {
            throw error
        }
    }

    async getBorrow(borrowAttributes: Partial<BorrowAttributes>): Promise<BorrowAttributes | null> {
        try {

            return await this.borrowRepository.findOne(borrowAttributes);

        } catch (error) {
            throw error
        }
    }

    async getBorrowByID(id: number): Promise<BorrowAttributes | null> {
        try {

            const book = await this.borrowRepository.findById(id);

            return book;
        } catch (error) {
            throw error
        }
    }


    async borrowBook(borrowBookDto: BorrowBookDto): Promise<BorrowAttributes> {
        try {

            const book = await this.bookServices.getBookByID(borrowBookDto.book_id);

            if (!book || book.qty <= 0) throw new NotFoundError("Book is not available currently");

            let borrow = await this.getBorrow({
                book_id: borrowBookDto.book_id,
                user_id: borrowBookDto.user_id,
                return_date: null
            });

            if (borrow) throw new BadRequestError("you already have this book");

            borrow = await this.borrowRepository.create(borrowBookDto)

            await this.bookServices.updatedQty({
                qty: book.qty - 1,
                id: borrowBookDto.book_id,
                userRole: ''
            })

            return borrow

        } catch (error) {
            throw error
        }
    }

    async returnBook(returnBookDto: ReturnBookDto): Promise<BorrowAttributes | null> {
        try {

            let borrow = await this.getBorrowByID(returnBookDto.id);

            if (!borrow) throw new NotFoundError();

            if (borrow.user_id !== returnBookDto.user_id) throw new ForbiddenError()

            if (borrow.return_date) throw new BadRequestError("book already returned")

            const return_date = moment().format("MM/DD/YYYY");

            const book = await this.bookServices.getBookByID(borrow.book_id)

            borrow = await this.borrowRepository.update(returnBookDto.id, { return_date });

            await this.bookServices.updatedQty({
                id: book?.id!,
                qty: book?.qty! + 1,
                userRole: ""

            })

            return borrow;

        } catch (error) {
            throw error
        }
    }

}
