import {
  DBMemberProject,
  DBLink,
  DBFile,
  DBMemberPhone,
  DBProjectMember,
} from "./composite.types";

export type DBGoal = {
  id?: never;
  created_at?: never;
  name?: string;
  description?: string | null;
  status?: string;
};

export type DBInvite = {
  id?: never;
  created_at?: never;
  status?: "Accepted" | "Pending" | "Denied";
  expiration?: Date | null;
  member?: never;
  project?: never;
  cool_down?: Date;
};

export type DBMember = {
  id?: never;
  created_at?: never;
  first_name?: string | null;
  last_name?: string | null;
  username: string;
  email: string;
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
  provider: "google" | "github" | "email";
  phone_number?: DBMemberPhone | null;
};

export type DBProject = {
  id?: never;
  created_at?: never;
  end_date?: Date | null;
  description?: string | null;
  qualifications?: string | null;
  title: string;
  banned_image?: string | null;
  logo?: string;
  status?: "In Progress";
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
  members: Array<DBProjectMember>;
};

export type DBRequest = {
  id?: never;
  created_at?: never;
  status?: "Pending";
  expiration: Date;
  removed?: never;
  project: number;
  cool_down?: null;
  member: string;
};
