const Joi = require('joi');
function validation(req, res, next) {
    const {name, email, password, confirmPassword} = req.body;
    const schema = Joi.object({
        username: Joi.string()
            .alphanum()
            .min(3)
            .max(10)
            .trim(false)
            .required(),
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
            .required(),
        repeat_password: Joi.ref('password'),
    })
    console.log({...req.body})
    try {
        const userDate = schema.validate({username: name, email: email, password: password, repeat_password: confirmPassword})
        console.log(userDate);
        if(userDate.error) {
            return res.redirect('signup');
        }
        next();
    } catch(err) {
        console.log('faild')
    }
}

module.exports = validation;