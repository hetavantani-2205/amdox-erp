export class CreateEmployeeDto {
  name!: string;
  email!: string;
  password!: string;
  role!: string;
  designation?: string;
  salary?: number;
}