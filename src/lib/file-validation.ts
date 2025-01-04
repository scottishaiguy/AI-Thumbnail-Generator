const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export async function validateFile(file: File): Promise<void> {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error('File type not supported. Please upload a JPG, PNG, or WEBP image.');
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error('File size exceeds 10MB limit.');
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error('Invalid image file.'));
    img.src = URL.createObjectURL(file);
  });
}