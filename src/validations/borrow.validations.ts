import BaseJoi from 'joi';
import JoiDate from '@joi/date';

const Joi = BaseJoi.extend(JoiDate);


const borrowBookSchema = Joi.object({
    checkout_date: Joi.date()
        .format("MM/DD/YYYY")
        .required(),
    due_date: Joi.date()
        .format("MM/DD/YYYY")
        .min(Joi.ref("checkout_date")) // Ensure due_date is not earlier than checkout_date
        .required(),
    book_id: Joi.number().integer().required(),
})

const getManySchema = Joi.object({


    page: Joi.number().min(1).optional(),
    limit: Joi.number().when('page', {
        is: Joi.exist(),
        then: Joi.required(),
        otherwise: Joi.optional()
    })

})


export {
    getManySchema,
    borrowBookSchema,
}