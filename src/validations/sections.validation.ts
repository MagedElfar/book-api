import Joi from "joi";


const createSectionSchema = Joi.object({

    name: Joi.string().required()
})


const updateSectionSchema = Joi.object({
    name: Joi.string().required()
})

const getManySchema = Joi.object({

    name: Joi.string().optional(),

    page: Joi.number().min(1).optional(),
    limit: Joi.number().when('page', {
        is: Joi.exist(),
        then: Joi.required(),
        otherwise: Joi.optional()
    })

})


export {
    createSectionSchema,
    updateSectionSchema,
    getManySchema
}