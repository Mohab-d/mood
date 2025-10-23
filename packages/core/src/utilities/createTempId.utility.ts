export function createTempId(): string {
  let tempId = "";

  tempId = tempId.concat("tempId_");
  tempId = tempId.concat(String(Date.now()));

  return tempId;
}
