import Member from "./Member.model.js";
import Role from "./Role.model.js";

const listMembers = async (_req, res, next) => {
  try {
    const members = await Member.find().populate("role").sort({ updatedAt: -1 });
    res.json({
      message: "Members fetched",
      code: "MEMBERS_FETCHED",
      data: members,
    });
  } catch (error) {
    next(error);
  }
};

const createMember = async (req, res, next) => {
  try {
    const member = await Member.create(req.body);
    res
      .status(201)
      .json({ message: "Member created", code: "MEMBER_CREATED", data: member });
  } catch (error) {
    next(error);
  }
};

const updateMember = async (req, res, next) => {
  try {
    const member = await Member.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!member) {
      return res.status(404).json({ message: "Member not found", code: "NOT_FOUND" });
    }
    return res.json({
      message: "Member updated",
      code: "MEMBER_UPDATED",
      data: member,
    });
  } catch (error) {
    return next(error);
  }
};

const deleteMember = async (req, res, next) => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id);
    if (!member) {
      return res.status(404).json({ message: "Member not found", code: "NOT_FOUND" });
    }
    return res.json({ message: "Member deleted", code: "MEMBER_DELETED" });
  } catch (error) {
    return next(error);
  }
};

const listRoles = async (_req, res, next) => {
  try {
    const roles = await Role.find().sort({ updatedAt: -1 });
    res.json({ message: "Roles fetched", code: "ROLES_FETCHED", data: roles });
  } catch (error) {
    next(error);
  }
};

const createRole = async (req, res, next) => {
  try {
    const role = await Role.create(req.body);
    res.status(201).json({ message: "Role created", code: "ROLE_CREATED", data: role });
  } catch (error) {
    next(error);
  }
};

const updateRole = async (req, res, next) => {
  try {
    const role = await Role.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!role) {
      return res.status(404).json({ message: "Role not found", code: "NOT_FOUND" });
    }
    return res.json({ message: "Role updated", code: "ROLE_UPDATED", data: role });
  } catch (error) {
    return next(error);
  }
};

const deleteRole = async (req, res, next) => {
  try {
    const role = await Role.findByIdAndDelete(req.params.id);
    if (!role) {
      return res.status(404).json({ message: "Role not found", code: "NOT_FOUND" });
    }
    return res.json({ message: "Role deleted", code: "ROLE_DELETED" });
  } catch (error) {
    return next(error);
  }
};

export {
  createMember,
  createRole,
  deleteMember,
  deleteRole,
  listMembers,
  listRoles,
  updateMember,
  updateRole,
};
