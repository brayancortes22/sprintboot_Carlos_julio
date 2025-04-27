/**
 * Estilos comunes para formularios en la aplicación
 */
export const formStyles = {
  // Clases para inputs, textareas y selects
  input: "form-control",
  inputInvalid: "form-control is-invalid",
  select: "form-select",
  selectInvalid: "form-select is-invalid",
  textarea: "form-control",
  textareaInvalid: "form-control is-invalid",
  
  // Clases para mensajes de error
  errorMessage: "invalid-feedback",
  
  // Clases para contenedores de formularios
  formGroup: "mb-3",
  formRow: "row mb-3",
  formCol: "col-md-6",
  
  // Clases para etiquetas
  label: "form-label",
  
  // Clases para alertas
  successAlert: "alert alert-success",
  errorAlert: "alert alert-danger",
  
  // Clases para botones
  primaryButton: "btn btn-primary w-100",
  successButton: "btn btn-success w-100",
  dangerButton: "btn btn-danger w-100",
  secondaryButton: "btn btn-secondary w-100",
  
  // Clases para separadores
  divider: "my-4 border-top"
};

/**
 * Función para obtener clase de input basada en si hay error
 * @param {boolean} hasError - Indica si el campo tiene error
 * @returns {string} - Clase CSS correspondiente
 */
export const getInputClass = (hasError) => {
  return hasError ? formStyles.inputInvalid : formStyles.input;
};

/**
 * Función para obtener clase de select basada en si hay error
 * @param {boolean} hasError - Indica si el campo tiene error
 * @returns {string} - Clase CSS correspondiente
 */
export const getSelectClass = (hasError) => {
  return hasError ? formStyles.selectInvalid : formStyles.select;
};

/**
 * Función para obtener clase de textarea basada en si hay error
 * @param {boolean} hasError - Indica si el campo tiene error
 * @returns {string} - Clase CSS correspondiente
 */
export const getTextareaClass = (hasError) => {
  return hasError ? formStyles.textareaInvalid : formStyles.textarea;
};

export default formStyles;