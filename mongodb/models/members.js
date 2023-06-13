import { Schema, model, models } from "mongoose";

const memberProject = new Schema(
  {
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    visibility: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { _id: false }
);

const memberSchema = new Schema({
  profile_pic: {
    type: String,
    default: "",
  },
  first_name: {
    type: String,
    trim: true,
    default: "",
  },
  last_name: {
    type: String,
    trim: true,
    default: "",
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    validate: {
      validator: function (e) {
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          e
        );
      },
      message: (props) => `${props.value} is not a valid email`,
    },
    required: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
    enum: ["Male", "Female"],
  },
  availability: {
    type: Boolean,
    default: true,
  },
  links: {
    type: Map,
    of: String,
  },
  description: {
    type: String,
    trim: true,
    default: "",
  },
  projects: {
    type: [memberProject],
  },
  requests: {
    type: [String],
  },
  invites: {
    type: [String],
  },
  banned_projects: {
    type: [Schema.Types.ObjectId],
    ref: "Project",
  },
  saved_projects: {
    type: [Schema.Types.ObjectId],
    ref: "Project",
  },
  liked_projects: {
    type: [Schema.Types.ObjectId],
    ref: "Project",
  },
  invite_limit: {
    type: Number,
    default: 20,
  },
  request_expiration: {
    type: Number,
    default: 30,
  },
  files: {
    type: [String],
  },
  specialities: {
    type: [String],
  },
});

const Member = models.Member || model("Member", memberSchema);

export { Member };
