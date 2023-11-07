import { WhereOptions, Attributes, Op, UpdateOptions } from "sequelize";
import { InternalServerError } from "../utility/errors";
import GenericRepository, { GetManyDto } from "./genericRepository";
import Section from "../models/sections.model";
import Row, { RowAttributes } from "../models/rows.model";

export default class RowRepository extends GenericRepository<Row, RowAttributes> {

    constructor() {
        super(Row)
    }

    public async findMany(getManyDto: GetManyDto): Promise<{ count: number, records: RowAttributes[] }> {
        try {
            const data = await this.model.findAll({
                where: getManyDto?.data?.name ?
                    {
                        name: {
                            [Op.like]: `%${getManyDto.data.name}%`
                        }
                    } : getManyDto.data,

                include: [
                    {
                        model: Section,
                        as: "section"
                    }
                ],

                limit: getManyDto.options.limit,
                offset: (getManyDto.options.page - 1) * getManyDto.options.limit,
            });

            const count = await this.model.count({
                where: getManyDto?.data?.name ?
                    {
                        name: {
                            [Op.like]: `%${getManyDto.data.name}%`
                        }
                    } : getManyDto.data
            });

            const records = data.map((model) => model.dataValues);

            return { count, records }
        } catch (error: any) {
            this.logger.error("database error", null, error);
            throw new InternalServerError("database error");
        }
    }


    public async findOne(data: WhereOptions<Attributes<Row>>): Promise<RowAttributes | null> {
        try {
            const model = await this.model.findOne({
                where: data,
                include: [
                    {
                        model: Section,
                        as: "section",
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