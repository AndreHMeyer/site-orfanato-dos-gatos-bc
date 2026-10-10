import { describe, expect, it } from 'vitest';
import { getDriveFolderUrl, getPublicOrigin } from '../src/lib/links';
import { siteConfig } from '../src/config/site';

describe('Pastas do Google Drive', () => {
  it.each([
    'https://drive.google.com/drive/folders/TEST_female-123',
    'https://drive.google.com/drive/folders/TEST_male-456?usp=sharing',
    'https://drive.google.com/drive/u/0/folders/TEST_folder',
    'https://drive.google.com/open?id=TEST_folder',
  ])('aceita a forma oficial %s', url => expect(getDriveFolderUrl(url)).toBe(url));
  it.each([
    null, '', 'não é URL', 'javascript:alert(1)', 'http://drive.google.com/drive/folders/test',
    'https://drive.google.com.evil.test/drive/folders/test', 'https://evil.test/drive.google.com/drive/folders/test',
    'https://drive.google.com@evil.test/drive/folders/test', 'https://user:password@drive.google.com/drive/folders/test',
    'https://drive.google.com:8080/drive/folders/test', 'https://drive.google.com/file/d/test/view',
    'https://drive.google.com/drive/folders/', 'https://drive.google.com/', 'https://drive.google.com/open?id=',
  ])('mantém indisponível a URL inválida %s', url => expect(getDriveFolderUrl(url)).toBeNull());
});
describe('Dados confirmados e pendências', () => {
  it('preserva a chave e os perfis informados no SDD', () => {
    expect(siteConfig.pix.key).toBe('orfanatodosgatos@gmail.com');
    expect(siteConfig.socials.instagram).toBe('https://www.instagram.com/orfanatodosgatosbc/');
    expect(siteConfig.socials.bazaarInstagram).toBe('https://www.instagram.com/bazar_orfanatodosgatos');
    expect(siteConfig.contact.mapsDirectionsUrl).toBe('https://www.google.com/maps/dir/?api=1&destination=-26.97372595007401%2C-48.64839788898396');
  });
  it('mantém dados não recebidos como null', () => {
    expect([siteConfig.adoption.femaleDriveUrl, siteConfig.adoption.maleDriveUrl, siteConfig.contact.whatsappNumber, siteConfig.contact.email, siteConfig.pix.beneficiaryName, siteConfig.pix.qrCodeAsset, siteConfig.domain, siteConfig.media.hero, siteConfig.media.about, siteConfig.media.ogCover]).toEqual(Array(10).fill(null));
  });
  it('não cria canonical para domínio ausente, inseguro ou com credenciais', () => {
    for (const value of [null, 'localhost', 'http://example.org', 'https://user:secret@example.org']) expect(getPublicOrigin(value)).toBeNull();
    expect(getPublicOrigin('https://example.org/')).toBe('https://example.org');
  });
});
