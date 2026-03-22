import { getPostById } from '../services/postService.js';

//define function to authorize ownership
export async function authorizeOwnership(req, res, next) {
  //get id from post
  const id = parseInt(req.params.id);
  //pass id to get post
  const post = await getPostById(id);
  //compare post authorId to id with authenticated user
  //current user is not the owner of post
  if (post.authorId != req.user.id) {
    const error = new Error('Forbidden insufficient permission');
    error.status = 403;
    return next(error);
  }
  //if user is author of post, proceed
  next();
}
