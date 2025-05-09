/** user's role */
export type Role = 0 | 1 | 2 | 3 | 4; // 0: user, 1: owner, 2: admin, 3: agent, 4: enterprise

export enum USER_ROLE {
  user = 0,
  owner = 1,
  admin = 2,
  agent = 3,
  enterprise = 4
}

export interface LoginParams {
  /** 用户名 */
  username: string;
  /** 用户密码 */
  password: string;
  type?: string;
}

export interface LoginResult {
  /** auth token */
  token: string;
  username: string;
  role: Role;
}

export interface LogoutParams {
  token: string;
}

export interface LogoutResult {}
