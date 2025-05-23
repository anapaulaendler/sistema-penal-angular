const Role = {
  Admin: "Admin",
  General: "General",
} as const;

export type Role = (typeof Role)[keyof typeof Role];
