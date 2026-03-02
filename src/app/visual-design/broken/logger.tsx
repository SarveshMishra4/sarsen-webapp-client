export function log(
  scope: string,
  message: string,
  data?: any
) {
  console.log(
    `[${scope}] ${message}`,
    data || ""
  );
}