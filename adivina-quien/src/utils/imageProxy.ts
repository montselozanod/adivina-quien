// Utility para manejar imágenes con CORS
export const getProxiedImageUrl = (originalUrl: string): string => {
  // Si ya es de Wikimedia, no necesita proxy
  if (originalUrl.includes('wikimedia.org') || originalUrl.includes('wikipedia.org')) {
    return originalUrl;
  }
  
  // Opción 1: Usar un proxy CORS público (puede ser inestable)
  // return `https://corsproxy.io/?${encodeURIComponent(originalUrl)}`;
  
  // Opción 2: Usar otro proxy
  return `https://api.allorigins.win/raw?url=${encodeURIComponent(originalUrl)}`;
  
  // Opción 3: Si tienes tu propio servidor backend, usa eso
  // return `/api/proxy-image?url=${encodeURIComponent(originalUrl)}`;
};
