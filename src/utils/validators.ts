export const requiredField = (value: string) => {
  if (value)
    return undefined
  else
    return 'Field is required';
}
