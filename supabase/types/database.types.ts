import type {
  DBMember as DBMemberSelect,
  DBProject as DBProjectSelect,
  DBInvite as DBInviteSelect,
  DBRequest as DBRequestSelect,
  DBGoal as DBGoalSelect,
} from "./select.types";
import type {
  DBGoal as DBGoalInsert,
  DBProject as DBProjectInsert,
  DBInvite as DBInviteInsert,
  DBRequest as DBRequestInsert,
  DBMember as DBMemberInsert,
} from "./insert.types";

export interface Database {
  public: {
    Tables: {
      members: {
        Row: DBMemberSelect;
        Insert: DBMemberInsert;
      };
      projects: {
        Row: DBProjectSelect;
        Insert: DBProjectInsert;
      };
      invites: {
        Row: DBInviteSelect;
        Insert: DBInviteInsert;
      };
      requests: {
        Row: DBRequestSelect;
        Insert: DBRequestInsert;
      };
      goals: {
        Row: DBGoalSelect;
        Insert: DBGoalInsert;
      };
    };
  };
}
