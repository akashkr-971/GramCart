// utils/translate.ts

export type Producttype = {
  id: number;
  name: string;
  description: string;
  image_url: string;
  price: number;
  rating: number;
};

export async function translateProducts(
  products: Producttype[],
  setProducts: (products: Producttype[]) => void
) {
  let lang = localStorage.getItem('lang') || 'en';
  if (lang === 'ml') lang = 'malayalam';
  if (lang === 'ta') lang = 'tamil';
  if (lang === 'hi') lang = 'hindi';

  const productText = products
    .map((p) => `Name: ${p.name}\nDescription: ${p.description}`)
    .join('\n\n');

  try {
    const response = await fetch('/api/groq', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userInput: productText,
        task: 'translate',
        lang,
      }),
    });

    const result = await response.json();
    if (!result.result) return;

    const translatedArray: { name: string; description: string }[] = JSON.parse(
      result.result
    );

    const translatedProducts = products.map((p, i) => ({
      ...p,
      name: translatedArray[i]?.name ?? p.name,
      description: translatedArray[i]?.description ?? p.description,
    }));

    setProducts(translatedProducts);
  } catch (err) {
    console.error('Translation failed:', err);
  }
}
