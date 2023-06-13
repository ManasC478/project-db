import { Project } from "../models";

// READ OPERATIONS
const getProjects = async (projectIds, projection = {}) => {
  // const projects = await Project.find(
  //   { _id: { $in: projectIds } },
  //   projection
  // ).exec();

  const projects = await Project.aggregate([
    { $match: { _id: { $in: projectIds } } },
    { $sort: { start_date: -1 } },
    { $project: projection },
  ]);
  return projects;
};

// CREATE OPERATIONS
const createProject = async (data, username) => {
  const project = new Project({
    ...data,
    members: [
      {
        member_username: username,
        role: "Owner",
      },
    ],
  });

  await project.save();

  return project;
};

// UPDATE OPERATIONS
const addMember = async (projectId, memberUsername, master = false) => {
  const project = await Project.findById(projectId).exec();
  project.members.push({
    member_username: memberUsername,
    role: master && "Master Member",
  });

  return project;
};

// DELETE OPERATIONS

export default { createProject, addMember, getProjects };
