export function validateName(name: string): string | null {
  const trimmed = name.trim();

  if (!trimmed) return "Name cannot be empty.";
  if (trimmed.length < 2) return "Name is too short (min 2).";
  if (trimmed.length > 30) return "Name is too long (max 30).";
  if (/\d/.test(trimmed)) return "Name cannot contain numbers.";
  if (!/[A-Za-zÀ-ÖØ-öø-ÿ]/.test(trimmed)) {
    return "Name must contain at least one letter.";
  }

  return null;
}