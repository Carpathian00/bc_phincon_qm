export type UploadRowUser = {
  id?: string;
  fullname: string;
  username: string;
  email: string;
  phoneNumber: string;
  role: string;
  active: boolean;
  data: string;
};

export type UploadRowCourse = {
  id?: string;
  code: string;
  title: string;
  description: string;
  order: number;
  data: string;
  tag: string;
  active: number;
}

export type UploadRowTryoutSection = {
  id?: string;
  code: string;
  title: string;
  description: string;
  order: number;
  data: string;
  tag: string;
  active: number;
}
