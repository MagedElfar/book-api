import { WhereOptions, Attributes, Op, UpdateOptions } from "sequelize";
import { InternalServerError } from "../utility/errors";
import GenericRepository, { GetManyDto } from "./genericRepository";
import Section, { SectionAttributes } from "../models/sections.model";
import Row from "../models/rows.model";

export default class SectionRepository extends GenericRepository<Section, SectionAttributes> {

    constructor() {
        super(Section)
    }

    public async findMany(getManyDto: GetManyDto): Promise<{ count: number, records: SectionAttributes[] }> {
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
                        model: Row,
                        as: "rows"
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

    public async findOne(data: WhereOptions<Attributes<Section>>): Promise<SectionAttributes | null> {
        try {
            const model = await this.model.findOne({
                where: data,
                include: [
                    {
                        model: Row,
                        as: "rows",
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