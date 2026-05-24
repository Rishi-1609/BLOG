export type ValidationResult = {
  valid: boolean;
  msg: string;
};

export function isRequired(input: any, field: string, dataType: string): ValidationResult {
  if (typeof input !== `${dataType}`)
    return { valid: false, msg: `${field} must be a ${dataType}` };

  if (!input || input.trim().length === 0)
    return { valid: false, msg: `${field} field is empty` };

  return { valid: true, msg: `${field} field is valid` };
}