import { UserPermissionFormData } from "@/components/dialogs/user-permission";

export interface UserInfoItem {
  _id: string;
  name: string;
  user: string;
  email: string;
  phone: string;
  pin: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  phone: string;
  pin: string;
  permission: UserPermissionFormData;
}
