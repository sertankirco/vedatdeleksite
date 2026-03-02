import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "wouter";
import { Heart } from "lucide-react";

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const footerStyle = {
    backgroundColor: '#FFFFFF',
    color: '#1E90FF',
    borderTop: '1px solid #E2E8F0',
    marginTop: '4rem',
  };

  const containerStyle = {
    maxWidth: '80rem',
    margin: '0 auto',
    padding: '0 1rem',
    paddingTop: '3rem',
    paddingBottom: '3rem',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '2rem',
    marginBottom: '2rem',
  };

  const columnStyle = {
    backgroundColor: '#FFFFFF',
  };

  const headingStyle = {
    fontWeight: '600',
    marginBottom: '1rem',
    color: '#1E90FF',
    backgroundColor: '#FFFFFF',
  };

  const textStyle = {
    fontSize: '0.875rem',
    color: '#1E90FF',
    backgroundColor: '#FFFFFF',
  };

  const linkStyle = {
    color: '#1E90FF',
    textDecoration: 'none',
    transition: 'color 0.3s',
    backgroundColor: '#FFFFFF',
  };

  const dividerStyle = {
    borderTop: '1px solid #E2E8F0',
    paddingTop: '2rem',
    backgroundColor: '#FFFFFF',
  };

  const bottomStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1rem',
    backgroundColor: '#FFFFFF',
  };

  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <div style={gridStyle}>
          {/* Brand */}
          <div style={columnStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <div style={{ fontSize: '1.5rem' }}>✨</div>
              <span style={{ fontWeight: 'bold', fontSize: '1.125rem', color: '#1E90FF', backgroundColor: '#FFFFFF' }}>
                Vedat Delek
              </span>
            </div>
            <p style={textStyle}>
              Yıldızların rehberliğinde yaşamı anlamak ve geleceği şekillendirmek.
            </p>
          </div>

          {/* Quick Links */}
          <div style={columnStyle}>
            <h3 style={headingStyle}>Hızlı Bağlantılar</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column' as const, gap: '0.5rem' }}>
              <li>
                <Link href="/biography" style={linkStyle}>
                  Biyografi
                </Link>
              </li>
              <li>
                <Link href="/blog" style={linkStyle}>
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/books" style={linkStyle}>
                  Hizmetler
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div style={columnStyle}>
            <h3 style={headingStyle}>Kaynaklar</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column' as const, gap: '0.5rem' }}>
              <li>
                <a href="#" style={linkStyle}>
                  Hakkında
                </a>
              </li>
              <li>
                <a href="#" style={linkStyle}>
                  İletişim
                </a>
              </li>
              <li>
                <a href="#" style={linkStyle}>
                  Gizlilik Politikası
                </a>
              </li>
              <li>
                <a href="#" style={linkStyle}>
                  Kullanım Şartları
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div style={columnStyle}>
            <h3 style={headingStyle}>Bizi Takip Edin</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column' as const, gap: '0.5rem' }}>
              <li>
                <a href="#" style={linkStyle}>
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" style={linkStyle}>
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" style={linkStyle}>
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" style={linkStyle}>
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div style={dividerStyle}>
          <div style={bottomStyle}>
            <p style={textStyle}>
              © {currentYear} Vedat Delek Astroloji Platformu. Tüm hakları saklıdır.
            </p>
            <p style={{ ...textStyle, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              Made with <Heart style={{ width: '1rem', height: '1rem', color: '#EF4444' }} /> by Manus
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
