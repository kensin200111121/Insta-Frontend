import { UserPermissionFormData } from "@/components/dialogs/user-permission";

export interface UserInfoItem {
  _id: string;
  name: string;
  user: string;
  email: string;
  phone: string;
  pin: string;
  permissions: Record<string, any>;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  phone: string;
  pin: string;
  permission: UserPermissionFormData;
}
