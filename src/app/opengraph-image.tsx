import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Casament de Natalia & Marco - 9 de Maig 2026';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  // Carregar fonts des del teu domini (funciona en producció)
  // En local, fallback a Google Fonts
  const baseUrl = process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';

  const aboveFont = fetch(`${baseUrl}/fonts/Above the Beyond Script.otf`).then((res) => res.arrayBuffer());
  const abhayaFont = fetch(`${baseUrl}/fonts/AbhayaLibre-Regular.ttf`).then((res) => res.arrayBuffer());

  const [above, abhaya] = await Promise.all([aboveFont, abhayaFont]);

  return new ImageResponse(
    (
      <div style={{
        height: '100%', width: '100%', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(135deg, #E0E5E1 0%, #C2D9D1 50%, #528185 100%)',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute', top: '40px', left: '40px', right: '40px', bottom: '40px',
          border: '3px solid rgba(82, 129, 133, 0.3)', borderRadius: '20px',
        }} />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
          <div style={{
            fontSize: '28px', letterSpacing: '0.3em', color: '#528185', marginBottom: '40px',
            fontFamily: 'Abhaya Libre', textTransform: 'uppercase',
          }}>BENVINGUTS AL NOSTRE CASAMENT</div>
          <div style={{
            fontSize: '120px', fontFamily: 'Above the Beyond Script', color: '#528185',
            marginBottom: '40px',
          }}>Natalia & Marco</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
            <div style={{ width: '80px', height: '2px', background: '#528185', opacity: 0.5 }} />
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#528185' }} />
            <div style={{ width: '80px', height: '2px', background: '#528185', opacity: 0.5 }} />
          </div>
          <div style={{
            fontSize: '32px', letterSpacing: '0.2em', color: '#528185', marginBottom: '10px',
            fontFamily: 'Abhaya Libre', fontWeight: 600,
          }}>CASTELLDEFELS</div>
          <div style={{
            fontSize: '28px', letterSpacing: '0.15em', color: '#528185',
            fontFamily: 'Abhaya Libre', fontWeight: 400,
          }}>DISSABTE 9 DE MAIG DEL 2026</div>
        </div>
        <div style={{
          position: 'absolute', top: '60px', left: '60px', width: '60px', height: '60px',
          borderLeft: '3px solid #528185', borderTop: '3px solid #528185', opacity: 0.3,
        }} />
        <div style={{
          position: 'absolute', top: '60px', right: '60px', width: '60px', height: '60px',
          borderRight: '3px solid #528185', borderTop: '3px solid #528185', opacity: 0.3,
        }} />
        <div style={{
          position: 'absolute', bottom: '60px', left: '60px', width: '60px', height: '60px',
          borderLeft: '3px solid #528185', borderBottom: '3px solid #528185', opacity: 0.3,
        }} />
        <div style={{
          position: 'absolute', bottom: '60px', right: '60px', width: '60px', height: '60px',
          borderRight: '3px solid #528185', borderBottom: '3px solid #528185', opacity: 0.3,
        }} />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Above the Beyond Script', data: above, style: 'normal', weight: 400 },
        { name: 'Abhaya Libre', data: abhaya, style: 'normal', weight: 400 },
      ],
    }
  );
}
