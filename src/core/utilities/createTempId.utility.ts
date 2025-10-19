export function createTempId(): string {
  let tempId = "";

  tempId.concat("tempId_");
  tempId.concat(String(Date.now()));

  return tempId;
}
