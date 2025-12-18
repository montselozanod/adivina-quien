// Utility para manejar imágenes con CORS
export const getProxiedImageUrl = (originalUrl: string): string => {
  // Si es una imagen local (empieza con / o no tiene protocolo http), usar PUBLIC_URL
  if (originalUrl.startsWith('/') || !originalUrl.startsWith('http')) {
    // Agregar PUBLIC_URL para que funcione con GitHub Pages
    return process.env.PUBLIC_URL + originalUrl;
  }
  
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

// Determina si una imagen necesita crossOrigin="anonymous"
// Solo las imágenes externas lo necesitan, las locales NO
export const needsCrossOrigin = (imageUrl: string): boolean => {
  // Imágenes locales no necesitan crossOrigin
  if (imageUrl.startsWith('/') || !imageUrl.startsWith('http')) {
    return false;
  }
  return true;
};
