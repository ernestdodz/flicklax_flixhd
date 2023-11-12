export const isJson = (data: string): boolean => {
  try {
    JSON.parse(data);
  } catch (err) {
    return false;
  }

  return true;
}
