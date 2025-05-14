export interface UserModel {
    id: string;
    fullname: string;
    username: string;
    email: string;
    phoneNumber: string;
    password: string;
    active: number
    data: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
  }