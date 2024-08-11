import Joi from "joi";

export const createUserSchema = Joi.object({
    username: Joi.string().required().min(4),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confirm_password: Joi.ref('password'),
});

export const loginUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

export const messageSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    subject: Joi.string().required(),
    message: Joi.string().required()
});

export const bookingSchema = Joi.object({
    name: Joi.string().required().messages({
        'any.required': 'Please provide your name'
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Please provide a valid email address',
        'any.required': 'Please provide your email'
    }),
    date: Joi.date().required().messages({
        'any.required': 'Please provide the date and time'
    }),
    destination: Joi.string().valid('Huye National Musium' /* add other destinations here */).required().messages({
        'any.required': 'Please select a destination',
        'any.only': 'Please select a valid destination'
    }),
    persons: Joi.number().min(1).required().messages({
        'number.min': 'Number of persons must be at least 1',
        'any.required': 'Please specify the number of persons'
    }),
    categories: Joi.string().valid('Kids' /* add other categories here */).required().messages({
        'any.required': 'Please select a category',
        'any.only': 'Please select a valid category'
    }),
    otherRequest: Joi.string().max(500).optional().messages({
        'string.max': 'Other request cannot exceed 500 characters'
    })
});
