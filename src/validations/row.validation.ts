import Joi from "joi";


const createRowSchema = Joi.object({

    name: Joi.string().required(),
    section_id: Joi.number().integer().required()

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
    createRowSchema,
    getManySchema
}