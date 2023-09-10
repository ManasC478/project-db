import {
  DBMemberProject,
  DBLink,
  DBFile,
  DBMemberPhone,
  DBProjectMember,
} from "./composite.types";

export type DBGoal = {
  id?: number;
  created_at?: Date;
  name?: string;
  description?: string | null;
  status?: string;
};

export type DBInvite = {
  id?: number;
  created_at?: Date;
  status?: "Accepted" | "Pending" | "Denied";
  expiration?: Date | null;
  member?: string;
  project?: number;
  cool_down?: Date | null;
};

export type DBMember = {
  id?: string;
  created_at?: Date;
  first_name?: string | null;
  last_name?: string | null;
  username?: string;
  email?: string;
  sex?: "Male" | "Female" | null;
  available?: boolean;
  bio?: string | null;
  invite_cool_down_period?: number;
  request_expiration?: number;
  skills?: Array<string>;
  banned_projects?: Array<string>;
  saved_projects?: Array<string>;
  liked_projects?: Array<string>;
  requests?: Array<number>;
  invites?: Array<number>;
  projects?: Array<DBMemberProject>;
  links?: Array<DBLink>;
  files?: Array<DBFile>;
  provider?: "google" | "github" | "email";
  phone_number?: DBMemberPhone | null;
};

export type DBProject = {
  id?: number;
  created_at?: Date;
  end_date?: Date | null;
  description?: string | null;
  qualifications?: string | null;
  title?: string;
  banned_image?: string | null;
  logo?: string;
  status?: "Completed" | "In Progress" | "Paused" | "Banned";
  open?: boolean;
  tags?: Array<string>;
  likes?: number;
  request_cool_down_period?: number;
  max_members?: number;
  goals?: Array<number>;
  invites?: Array<number>;
  requests?: Array<number>;
  invite_expiration?: number;
  features?: Array<string>;
  links?: Array<DBLink>;
  files?: Array<DBFile>;
  members_of_interest?: Array<string>;
  banned_members?: Array<string>;
  members?: Array<DBProjectMember>;
};

export type DBRequest = {
  id?: number;
  created_at?: Date;
  status?: "Accepted" | "Pending" | "Denied" | "Banned";
  expiration?: Date | null;
  removed?: boolean;
  project?: number;
  cool_down?: Date | null;
  member?: string;
};
