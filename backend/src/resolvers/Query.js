const { forwardTo } = require('prisma-binding');
const { hasPermission } = require('../utils');

const Query = {
  me(parent, args, ctx, info) {
    // check if there is a current user ID
    if (!ctx.request.userId) {
      return null;
    }

    return ctx.db.query.user({
      where: {
        id: ctx.request.userId
      }
    }, info);
  },
  users(parent, args, ctx, info) {
    // check if there is a current user ID
    if (!ctx.request.user) {
      throw new Error('You must be logged in.');
    }

    console.log(ctx.request.user)
    // checks if the user has the required permission, otherwise throws an error
    hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE']);

    return ctx.db.query.users({}, info);
  },
  food: forwardTo('db'),
  foods: forwardTo('db'),
  foodsConnection: forwardTo('db'),
  ingredients: forwardTo('db'),
    ingredientsConnection: forwardTo('db'),
    recipe: forwardTo('db'),
    recipes: forwardTo('db'),
};

module.exports = Query;
