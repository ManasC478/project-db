import { Schema, model, models } from "mongoose";

const projectMember = new Schema(
  {
    member_username: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Owner", "Master Member", "Member"],
      default: "Member",
      required: true,
    },
    suspended: {
      type: Boolean,
      required: true,
      default: false,
    },
    suspensionTime: {
      type: Number,
      required: function () {
        return this.suspended;
      },
    },
  },
  { _id: false }
);

const projectLink = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const projectSchema = new Schema({
  start_date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  end_date: {
    type: Date,
  },
  description: {
    type: String,
    trim: true,
  },
  qualifications: {
    type: String,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
  },
  logo: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Completed", "In Progress", "Paused", "Banned"],
    required: true,
    default: "In Progress",
  },
  availability: {
    type: String,
    enum: ["Open", "Closed"],
    required: true,
    default: "Closed",
  },
  tags: {
    type: [String],
  },
  likes: {
    type: Number,
    default: 0,
  },
  request_limit: {
    type: Number,
    default: 3,
    min: 3,
  },
  max_members: {
    type: Number,
    min: 1,
    default: 10,
    required: true,
  },
  members: {
    type: [projectMember],
  },
  members_of_interest: {
    type: [Schema.Types.ObjectId],
    ref: "Member",
  },
  links: {
    type: [projectLink],
  },
  goals: {
    type: [String],
  },
  requests: {
    type: [String],
  },
  invites: {
    type: [String],
  },
  media: {
    type: [String],
  },
});

const Project = models.Project || model("Project", projectSchema);

export { Project };
