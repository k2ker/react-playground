type UserPatchParam = {
  name: string;
};

type SignInParam = {
  email: string;
  password: string;
};

type SignUpParam = {
  name: string;
  email: string;
  password: string;
};

type EmailDupCheckParam = {
  email: string;
};

type SignUpInputs = {
  email: string;
  name: string;
  password: string;
  passwordRepeat?: string;
};

type SignInInputs = {
  email: string;
  password: string;
};

type Product = {
  id: string;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
};

type KakaoAuth = {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  refresh_token_expires_in: number;
};

type Employee = {
  id: string;
  No: string;
  FirstName: string;
  LastName: string;
  Salary: number;
  Age: number;
};

type EmployeePostParam = Omit<Employee, id, No>;

type EmployeePatchParam = Omit<Employee, id, No>;

type EmployeeFormInputs = Partial<EmployeePostParam>;
