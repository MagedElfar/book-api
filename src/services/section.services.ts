import { BadRequestError, NotFoundError } from "../utility/errors";
import { GetManyDto } from "../repositories/genericRepository";
import { SectionAttributes } from "../models/sections.model";
import SectionRepository from "../repositories/section.repository";
import { CreateSectionDto, UpdatedSectionDto } from "../dto/section.dto";


export interface ISectionServices {
    createSection(createSectionDto: CreateSectionDto): Promise<SectionAttributes>;
    getSections(getManyDto: GetManyDto): Promise<any>;
    deleteSection(id: number): Promise<void>
    updatedSection(updateSectionDto: UpdatedSectionDto): Promise<SectionAttributes | null>
    getSection(sectionAttributes: Partial<SectionAttributes>): Promise<SectionAttributes | null>
    getSectionByID(id: number): Promise<SectionAttributes | null>
}

export default class SectionServices implements ISectionServices {

    private readonly sectionRepository: SectionRepository;

    constructor(sectionRepository: SectionRepository) {
        this.sectionRepository = sectionRepository
    }

    async getSections(getManyDto: GetManyDto): Promise<any> {
        try {

            const data = await this.sectionRepository.findMany(getManyDto)

            return data
        } catch (error) {
            throw error
        }
    }

    async getSection(sectionAttributes: Partial<SectionAttributes>): Promise<SectionAttributes | null> {
        try {

            const section = await this.sectionRepository.findOne(sectionAttributes);

            return section;
        } catch (error) {
            throw error
        }
    }

    async getSectionByID(id: number): Promise<SectionAttributes | null> {
        try {

            const section = await this.sectionRepository.findById(id);

            return section;
        } catch (error) {
            throw error
        }
    }


    async createSection(createSectionDto: CreateSectionDto): Promise<SectionAttributes> {
        let section;
        try {

            section = await this.getSection({
                name: createSectionDto.name
            })

            if (section) throw new BadRequestError("section is already exist")

            section = await this.sectionRepository.create(createSectionDto)


            return section;
        } catch (error) {
            throw error
        }
    }

    async deleteSection(id: number): Promise<void> {
        try {

            const section = await this.getSectionByID(id);

            if (!section) throw new NotFoundError("section not found")

            await this.sectionRepository.delete({ id })

            return;
        } catch (error) {
            throw error
        }
    }

    async updatedSection(updateSectionDto: UpdatedSectionDto): Promise<SectionAttributes | null> {
        const { id, ...updateData } = updateSectionDto
        try {

            const section = await this.getSectionByID(id);

            if (!section) throw new NotFoundError("section not found")

            const isSection = await this.getSection({ name: updateData.name });

            if (isSection) throw new BadRequestError("section is already exist")


            return await this.sectionRepository.update(id, updateData);

        } catch (error) {
            throw error
        }
    }
}
