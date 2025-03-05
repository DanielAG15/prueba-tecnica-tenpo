// Función para generar un token aleatorio
const generateFakeToken = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

// Simular un llamado a una API de login
export const fakeLogin = async (email: string, password: string) => {
  return new Promise<{ email: string; password: string; token: string }>(
    (resolve) => {
      setTimeout(() => {
        resolve({
          email,
          password,
          token: generateFakeToken(),
        });
      }, 1000); // Simulamos un retraso de 1 segundo
    }
  );
};
