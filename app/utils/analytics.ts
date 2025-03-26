// Function to track form conversion
export const trackFormConversion = () => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'conversion', {
      'send_to': 'AW-11266387977/74hOCL3q2JYZEIngnfwp'
    });
  }
} 