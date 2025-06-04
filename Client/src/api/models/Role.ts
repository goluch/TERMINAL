const roles = ["Administrator", "Moderator", "Registered", "Guest"] as const;

export type Role = (typeof roles)[number];

export default roles;
