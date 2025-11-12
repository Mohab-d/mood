export const Queries = {
  fetchAllUsers: `
  SELECT * FROM usr;
`,

  createNewUser: `
  INSERT INTO usr
  (name, email, role, password)
  VALUES($1, $2, $3, $4)
  RETURNING *
`,

  createNewToken: `
  INSERT INTO token
  (token)
  VALUES($1)
  RETURNING *
`,

  deleteToken: `
  DELETE FROM token
  WHERE id = $1
`,

  fetchTokenById: `
  SELECT * FROM token WHERE id = $1
`,
};
