const bcrypt = require('bcryptjs');

const User = require('../../models/user');

module.exports = {
    createUser: async (args) => {
        try {
            const existingUser = await User.findOne({ email: args.userInput.email })
            if (existingUser) {
                throw new Error("User already exists");
            }
            const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

            const user = new User({
                email: args.userInput.email,
                password: hashedPassword
            })
            //save to db
            const result = await user.save();

            return { ...result._doc, password: null, id: result.id }
        } catch (err) {
            throw err;
        }
    }
}