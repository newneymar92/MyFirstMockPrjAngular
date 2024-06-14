export interface Student {
  id: string;
  firstname: string;
  lastname: string;
  age: number;
  gender: string;
}

export interface Account {
  id?: string;
  username: string;
  password: string;
  nickname: string;
  phoneNumber: string;
  createdAt?: Date;
}
