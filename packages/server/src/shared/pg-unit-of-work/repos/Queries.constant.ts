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

  fetchManyItemById: `
  SELECT * FROM item WHERE id = ANY(string_to_array($1, ',')::UUID[]);
`,

  fetchAllItems: `
  SELECT
    i_main.id,
    i_main.name,
    i_main.is_option as "isOption",
    i_main.is_stackable as "isStackable",
    ARRAY_AGG(
      JSON_BUILD_OBJECT(
        'id', sub_item.id,
        'name', sub_item.name,
        'isOption', sub_item.is_option,
        'isStackable', sub_item.is_stackable
      )
    ) FILTER (
      WHERE
        sub_item.id is not null
    ) AS options
  FROM
    item i_main
    LEFT JOIN item_option i_option ON i_option.item_id = i_main.id
    LEFT JOIN item sub_item ON sub_item.id = i_option.option_id
  WHERE i_main.is_option IS NOT TRUE
  GROUP BY
    i_main.id;
`,

  createNewItem: `
  INSERT INTO item (name, is_option, is_stackable)
  VALUES ($1, $2, $3)
  RETURNING *;
`,

  addItemOptions: `
  INSERT INTO item_option (item_id, option_id)
  SELECT $1, UNNEST(string_to_array($2, ',')::UUID[]);
`,
};
