import { BadRequestError, NotFoundError } from "../utility/errors";
import { GetManyDto } from "../repositories/genericRepository";
import { SectionAttributes } from "../models/sections.model";
import SectionRepository from "../repositories/section.repository";
import { CreateSectionDto, UpdatedSectionDto } from "../dto/section.dto";
import { CreateRowDto } from "../dto/row.dto";
import { RowAttributes } from "../models/rows.model";
import { ISectionServices } from "./section.services";
import RowRepository from "../repositories/row.repository";


export interface IRowServices {
    createRow(createRowDto: CreateRowDto): Promise<RowAttributes>;
    deleteRow(id: number): Promise<void>
    getRowByID(id: number): Promise<RowAttributes | null>
    getRow(data: Partial<RowAttributes>): Promise<RowAttributes | null>
    getRows(getManyDto: GetManyDto): Promise<any>
}

export default class RowServices implements IRowServices {

    private readonly sectionServices: ISectionServices;
    private readonly rowRepository: RowRepository;


    constructor(sectionServices: ISectionServices, rowRepository: RowRepository) {
        this.sectionServices = sectionServices
        this.rowRepository = rowRepository
    }

    async getRows(getManyDto: GetManyDto): Promise<any> {
        try {

            const data = await this.rowRepository.findMany(getManyDto)

            return data
        } catch (error) {
            throw error
        }
    }

    async getRowByID(id: number): Promise<RowAttributes | null> {
        try {

            const section = await this.rowRepository.findById(id);

            return section;
        } catch (error) {
            throw error
        }
    }

    async getRow(data: Partial<RowAttributes>): Promise<RowAttributes | null> {
        try {

            const section = await this.rowRepository.findOne(data);

            return section;
        } catch (error) {
            throw error
        }
    }


    async createRow(createRowDto: CreateRowDto): Promise<RowAttributes> {
        try {

            const section = await this.sectionServices.getSectionByID(createRowDto.section_id)

            if (!section) throw new NotFoundError("section is not exist")

            let row = await this.getRow(createRowDto)

            if (row) throw new BadRequestError("row is already exist")


            return await this.rowRepository.create(createRowDto);
        } catch (error) {
            throw error
        }
    }

    async deleteRow(id: number): Promise<void> {
        try {

            const section = await this.getRowByID(id);

            if (!section) throw new NotFoundError("row not found")

            await this.rowRepository.delete({ id })

            return;
        } catch (error) {
            throw error
        }
    }
}
