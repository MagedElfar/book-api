import { WhereOptions, Attributes, Op, UpdateOptions } from "sequelize";
import { InternalServerError } from "../utility/errors";
import GenericRepository, { GetManyDto } from "./genericRepository";
import Book, { BookAttributes } from "../models/book.model";
import Row from "../models/rows.model";
import Section from "../models/sections.model";

export default class BookRepository extends GenericRepository<Book, BookAttributes> {

    constructor() {
        super(Book)
    }

    public async findMany(getManyDto: GetManyDto): Promise<{ count: number, records: BookAttributes[] }> {
        try {
            const data = await this.model.findAll({
                where: getManyDto?.data?.title ?
                    {
                        ...getManyDto.data,
                        title: {
                            [Op.like]: `%${getManyDto.data.title}%`
                        },
                    } : getManyDto.data,

                include: [
                    {
                        model: Row,
                        as: "shelfLocation",
                        attributes: ["name"],
                        include: [
                            {
                                model: Section,
                                as: "section",
                                attributes: ["name"]
                            }
                        ]

                    },
                ],

                limit: getManyDto.options.limit,
                offset: (getManyDto.options.page - 1) * getManyDto.options.limit,
            });

            const count = await this.model.count({
                where: getManyDto?.data?.title ?
                    {
                        ...getManyDto.data,
                        title: {
                            [Op.like]: `%${getManyDto.data.title}%`
                        },
                    } : getManyDto.data,
            });

            const records = data.map((model) => model.dataValues);

            return { count, records }
        } catch (error: any) {
            this.logger.error("database error", null, error);
            throw new InternalServerError("database error");
        }
    }


    public async findOne(data: WhereOptions<Attributes<Book>>): Promise<BookAttributes | null> {
        try {
            const model = await this.model.findOne({
                where: data,
                include: [
                    {
                        model: Row,
                        as: "shelfLocation",
                        attributes: ["name"],
                        include: [
                            {
                                model: Section,
                                as: "section",
                                attributes: ["name"]
                            }
                        ]

                    },
                ]
            });

            if (!model) return null

            return model?.dataValues
        } catch (error: any) {
            console.log(error)
            this.logger.error("database error", null, error?.stack || error?.message || error)
            throw new InternalServerError("database error")
        }
    }
}