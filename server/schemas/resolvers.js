const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find();
        },
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('User not found.');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect password.')
            }

            const token = signToken(user);
            return { token, user };
        },

        // addBook: async ( parent, args, context) => {
        //     if (context.user) {
        //         const updatedUser = await User.findByIdAndUpdate(
        //             { _id: context.user._id },
        //             { $addToSet: {savedBook: args.input } },
        //             { new: true }
        //         );

        //         return updatedUser;
        //     }

        //     throw new AuthenticationError('Please log in.');
        // }
    }
};

module.exports = resolvers;