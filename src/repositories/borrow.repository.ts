import { Op } from "sequelize";
import Book from "../models/book.model";
import Borrow, { BorrowAttributes } from "../models/borrow.model";
import User from "../models/user.model";
import { InternalServerError } from "../utility/errors";
import GenericRepository, { GetManyDto } from "./genericRepository";

export default class BorrowRepository extends GenericRepository<Borrow, BorrowAttributes> {

    constructor() {
        super(Borrow)
    }

    public async findMany(getManyDto: GetManyDto): Promise<{ count: number, records: BorrowAttributes[] }> {
        try {
            const { overdue = false, ...otherDta } = getManyDto?.data
            const whereCondition: any = otherDta

            if (overdue) {
                const currentDate = new Date();
                whereCondition.due_date = {
                    [Op.lt]: currentDate, // Due date is earlier than the provided date
                };
            }

            const data = await this.model.findAll({
                where: whereCondition,
                include: [
                    {
                        model: Book,
                        as: "book",
                        attributes: ["id", "title", "ISBN"]
                    },

                    {
                        model: User,
                        as: "user",
                        attributes: ["id", "name", "email"]
                    },
                ],

                limit: getManyDto.options.limit,
                offset: (getManyDto.options.page - 1) * getManyDto.options.limit,
            });

            const count = await this.model.count({
                where: whereCondition,
            });

            const records = data.map((model) => model.dataValues);

            return { count, records }
        } catch (error: any) {
            this.logger.error("database error", null, error);
            throw new InternalServerError("database error");
        }
    }
}