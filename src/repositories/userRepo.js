import prisma from '../config/db.js';

export async function createUser(data) {
  try {
    //create new user with email and omit password
    const newUser = await prisma.user.create({
      data,
      omit: { password: true },
    });
    return newUser;
  } catch (error) {
    if (error.code === 'P2002') {
      //throws conflict error if email is used
      const err = new Error('Email has already been used');
      err.status = 409;
      throw err;
    }
    //throws original error
    throw error;
  }
}

export async function findUserByEmail(email) {
  //find user who email matches the field
  return prisma.user.findUnique({ where: { email } });
}

export async function findAllUsers() {
  //retrieve all users except password
  return prisma.user.findMany({ omit: { password: true } });
}
