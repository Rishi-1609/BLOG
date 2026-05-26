export type ValidationResult = {
  success: boolean;
  message: string;
};

export function isRequired(input: any, field: string, dataType: string): ValidationResult {
  if (typeof input !== `${dataType}`)
    return { success: false, message: `${field} must be a ${dataType}` };

  if (!input || input.trim().length === 0)
    return { success: false, message: `${field} field is empty` };

  return { success: true, message: `${field} field is success` };
}