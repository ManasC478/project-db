import { Member } from "@/mongodb/models";
import { genSalt, hash, compare } from "bcrypt";
import { UserError } from "@/util/error";

// READ  OPERATIONS
const hasMember = async (credentials) => {
  let exists = await getMemberWithoutId({ email: credentials.email });
  if (exists) {
    throw new UserError(
      `Email '${credentials.email}' is already signed up.`,
      400
    );
  }
  exists = await getMemberWithoutId({ username: credentials.username });
  if (exists) {
    throw new UserError(
      `Username '${credentials.username}' already exists. Please choose another one.`,
      400
    );
  }
};

const getMemberWithId = async (id) => {
  return await Member.findById(id).exec();
};

const getMemberWithoutId = async (queryParam, projection = {}) => {
  return await Member.findOne(queryParam, projection).exec();
};

const verifyMemberCredentials = async ({ email, password }) => {
  const member = await getMemberWithoutId({ email });
  if (!member) {
    throw new UserError("Member not found.", 404);
  }

  if (!(await compare(password, member.password))) {
    throw new UserError("Password does not match.", 400);
  }

  return member;
};

// CREATE OPERATIONS
const createMember = async (credentials) => {
  const salt = await genSalt();
  const hashedPassword = await hash(credentials.password, salt);
  const member = new Member({
    ...credentials,
    password: hashedPassword,
    salt,
  });
  await member.save();
  return member;
};

// UPDATE OPERATIONS
const addProject = async (username, projectId) => {
  await Member.updateOne(
    { username },
    { $push: { projects: { project: projectId } } }
  );
};

// DELETE OPERATIONS

export default {
  createMember,
  hasMember,
  getMemberWithId,
  getMemberWithoutId,
  verifyMemberCredentials,
  addProject,
};
