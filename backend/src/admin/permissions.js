const adminPermissions = {
  cms: ["pages:read", "pages:write", "menus:write", "settings:write"],
  members: ["members:read", "members:write", "roles:write"],
  media: ["media:read", "media:write"],
  events: ["events:read", "events:write"],
};

const resolvePermissions = (role) => {
  if (role === "admin") {
    return Object.values(adminPermissions).flat();
  }
  return [];
};

export { adminPermissions, resolvePermissions };
