import { Optional } from 'sequelize';
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


const getManyBorrow = Joi.object({

    user_id: Joi.number().optional(),
    overdue: Joi.number().min(0).max(1).equal(1).optional(),
    isBorrow: Joi.number().min(0).max(1).when('overdue', {
        is: Joi.exist(),
        then: Joi.equal(1).required(),
        otherwise: Joi.optional()
    }),
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
    getManyBorrow
}