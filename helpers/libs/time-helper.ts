export class TimeHelper {
  static validateTimeFormat(time: string): Boolean {
    // Validación del formato de hora

    const timeRegex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
    return timeRegex.test(time);
  }

  static formatTimeInput(text: string): string {
    // Eliminar cualquier carácter que no sea número
    let value = text.replace(/[^0-9]/g, "");

    // Si hay 3 o más caracteres y no hay dos puntos, añadirlos
    if (value.length >= 3 && !value.includes(":")) {
      value = `${value.slice(0, 2)}:${value.slice(2)}`;
    }

    // Limitar a 5 caracteres (HH:mm)
    if (value.length > 5) {
      value = value.slice(0, 5);
    }

    return value;
  }
}
