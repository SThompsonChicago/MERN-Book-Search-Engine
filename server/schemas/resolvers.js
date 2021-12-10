const { User } = require('../models');

const resolvers = {
    Query: {
        user: async (parent, { userId }) => {
            return User.findOne({
                $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
              });
        },
    },

    Mutation: {
        
    }
}