import Joi from "joi";

const createBookSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    ISBN: Joi.string().required(),
    qty: Joi.number().integer().required(),
    row_id: Joi.number().integer().required(),
})

const updateBookSchema = Joi.object({
    title: Joi.string().optional(),
    author: Joi.string().optional(),
    ISBN: Joi.string().optional(),
    qty: Joi.number().integer().optional(),
    row_id: Joi.number().integer().optional(),
})


const getManySchema = Joi.object({

    title: Joi.string().optional(),
    author: Joi.string().optional(),
    ISBN: Joi.string().optional(),
    page: Joi.number().min(1).optional(),
    limit: Joi.number().when('page', {
        is: Joi.exist(),
        then: Joi.required(),
        otherwise: Joi.optional()
    })

})


export {
    createBookSchema,
    updateBookSchema,
    getManySchema
}