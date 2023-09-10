import {
  FiPlus,
  FiCheck,
  FiX,
  FiChevronDown,
  FiUser,
  FiSettings,
  FiLogOut,
  FiEdit3,
  FiUpload,
  FiDownload,
  FiTrash2,
  FiLayers,
} from "react-icons/fi";

import { FcGoogle } from "react-icons/fc";
import { BiLogoGithub } from "react-icons/bi";

type IconProps = {
  name:
    | "Add"
    | "Check"
    | "Clear"
    | "Dropdown"
    | "Profile"
    | "Settings"
    | "Logout"
    | "Edit"
    | "Upload"
    | "Download"
    | "Trash"
    | "Google-Colored"
    | "Github"
    | "Dashboard";
  props?: any;
};

export default function Icon({ name, ...props }: IconProps) {
  switch (name) {
    case "Add":
      return <FiPlus size={22} {...props} />;
    case "Check":
      return <FiCheck size={22} {...props} />;
    case "Clear":
      return <FiX size={22} {...props} />;
    case "Dropdown":
      return <FiChevronDown size={22} {...props} />;
    case "Profile":
      return <FiUser size={22} {...props} />;
    case "Settings":
      return <FiSettings size={22} {...props} />;
    case "Logout":
      return <FiLogOut size={22} {...props} />;
    case "Edit":
      return <FiEdit3 size={22} {...props} />;
    case "Upload":
      return <FiUpload size={22} {...props} />;
    case "Download":
      return <FiDownload size={22} {...props} />;
    case "Trash":
      return <FiTrash2 size={22} {...props} />;
    case "Google-Colored":
      return <FcGoogle size={22} {...props} />;
    case "Github":
      return <BiLogoGithub size={22} {...props} />;
    case "Dashboard":
      return <FiLayers size={22} {...props} />;
    default:
      return <div></div>;
  }
}
