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
    message: Joi.string().min(6).required(),
});

export const bookingSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    otherRequest: Joi.string().min(6).required(),
})
