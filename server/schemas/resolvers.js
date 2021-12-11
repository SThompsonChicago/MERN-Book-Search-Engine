const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        user: async (parent, { userId, username }) => {
            return User.findOne({
                $or: [ { _id : userId }, { username: params.username }],
              });
        },
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.createIndexes({ username, email, password });
            const token = signToken(user);
            return {token, user };
        },
    }
};

module.exports = resolvers;