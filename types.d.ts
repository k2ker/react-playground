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
