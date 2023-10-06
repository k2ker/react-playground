export const Validation = {
  email: {
    required: "미입력 상태입니다.",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "이메일 형식에 맞지 않습니다.",
    },
  },
  password: {
    required: "미입력 상태입니다.",
    pattern: {
      value: /^\S{6,}$/,
      message: "공백 없이 6자 이상 입력해주세요.",
    },
  },
  name: {
    required: "미입력 상태입니다.",
    pattern: {
      value: /^\S+$/,
      message: "공백 없이 입력해주세요.",
    },
  },
};
