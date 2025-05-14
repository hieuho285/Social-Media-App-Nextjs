export const REGEX = {
  password: {
    regex:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d@$!%*?&]{8,20}$/,
    description:
      "8–20 characters. Must include uppercase, lowercase, number, and special character @$!%*?&",
  },
};
