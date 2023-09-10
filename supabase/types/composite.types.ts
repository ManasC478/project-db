export type DBMemberProject = {
  project_id: number;
  public: boolean;
};

export type DBLink = {
  name: string;
  href: string;
};

export type DBFile = {
  key: string;
  public: boolean;
};

export type DBMemberPhone = {
  country: string;
  country_code: string;
  number: string;
};

export type DBProjectMember = {
  member_id: string;
  role: "Owner" | "Master Member" | "Member";
  suspended: boolean;
  suspensiontime: Date;
};
