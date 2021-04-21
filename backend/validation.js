const Joi = require('@hapi/joi');

const register_validation = body => {
    const schema = Joi.object({
        name: Joi.string()
                .min(6)
                .required(),
        email: Joi.string()
                .min(6)
                .required()
                .email(), 
        password: Joi.string()
                .min(6)
                .required()
    });
    return schema.validate(body);
};

const login_validation = body => {
    const schema = Joi.object({
        email: Joi.string()
                .min(6)
                .required()
                .email(), 
        password: Joi.string()
                .min(6)
                .required()
    });
    return schema.validate(body);
};

const new_board_validation = body => {
        const schema = Joi.object({
                title: Joi.string()
                        .min(6)
                        .required(), 
                is_public: Joi.bool()
        });
        return schema.validate(body);
};

module.exports.register_validation = register_validation;
module.exports.login_validation = login_validation;
module.exports.new_board_validation = new_board_validation;