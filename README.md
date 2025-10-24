# Cravex v2 - Matrix Communication Platform

Modern, güvenli ve özel mesajlaşma platformu. Matrix protokolü üzerine inşa edilmiş tam özellikli iletişim çözümü.

## 🚀 Özellikler

- **🔒 End-to-End Şifreleme**: Güvenli mesajlaşma
- **💬 Gerçek Zamanlı Mesajlaşma**: Anlık iletişim
- **👥 Grup Sohbetleri**: Sınırsız katılımcı
- **📁 Dosya Paylaşımı**: Güvenli dosya transferi
- **🎥 Ses/Video Aramaları**: WebRTC tabanlı
- **🌐 Federasyon Desteği**: Diğer Matrix sunucularıyla iletişim
- **📱 Responsive Tasarım**: Tüm cihazlarda çalışır
- **🔧 Admin Panel**: Tam sunucu kontrolü

## 📦 İçerik

Bu proje üç ana bileşenden oluşur:

### 1. Element Web (`www/element-web/`)
- Matrix protokolü için modern web istemcisi
- React + TypeScript
- Tam özellikli mesajlaşma arayüzü

### 2. Synapse Admin (`www/admin/`)
- Matrix Synapse sunucu yönetim paneli
- React Admin framework
- Kullanıcı ve oda yönetimi

### 3. Element Call (`www/call.cravex.chat/`)
- WebRTC video konferans sistemi
- LiveKit entegrasyonu

## 🛠️ Kurulum

### Gereksinimler

- Node.js >= 20.0.0
- Yarn >= 1.22.x
- Docker (opsiyonel, Synapse sunucusu için)

### Hızlı Başlangıç

#### 1. Element Web

```bash
cd www/element-web
yarn install
yarn start
```

Element Web şu adreste çalışacak: http://localhost:8080

#### 2. Synapse Admin

```bash
cd www/admin
yarn install
yarn start
```

Admin Panel şu adreste çalışacak: http://localhost:5173

#### 3. Matrix Synapse Sunucusu (Docker)

```bash
# Yapılandırma dizini oluştur
mkdir synapse-data

# Yapılandırma dosyalarını oluştur
docker run -it --rm \
  -v ${PWD}/synapse-data:/data \
  -e SYNAPSE_SERVER_NAME=localhost \
  -e SYNAPSE_REPORT_STATS=no \
  matrixdotorg/synapse:latest generate

# Kullanıcı kaydını etkinleştir (homeserver.yaml'ı düzenleyin)
# enable_registration: true ekleyin

# Synapse'i başlat
docker run -d --name synapse \
  -p 8008:8008 \
  -v ${PWD}/synapse-data:/data \
  matrixdotorg/synapse:latest
```

Synapse şu adreste çalışacak: http://localhost:8008

## ⚙️ Yapılandırma

### Element Web

`www/element-web/config.json` dosyasını düzenleyin:

```json
{
  "default_server_config": {
    "m.homeserver": {
      "base_url": "http://localhost:8008",
      "server_name": "localhost"
    }
  }
}
```

### Synapse Admin

`www/admin/public/config.json` dosyasını düzenleyin:

```json
{
  "restrictBaseUrl": "http://localhost:8008"
}
```

## 📖 Kullanım

### Yeni Hesap Oluşturma

1. Element Web'i açın: http://localhost:8080
2. "Create Account" butonuna tıklayın
3. Kullanıcı adı ve şifre belirleyin
4. Hesabınızı oluşturun

### Mesajlaşma

1. Yeni bir sohbet başlatmak için "+" butonuna tıklayın
2. Kullanıcı ara: `@kullaniciadi:localhost`
3. Mesajlaşmaya başlayın!

### Admin Paneli

1. Admin panelini açın: http://localhost:5173
2. Admin kullanıcısı ile giriş yapın
3. Kullanıcıları, odaları ve sunucu ayarlarını yönetin

## 🔧 Geliştirme

### Element Web

```bash
cd www/element-web
yarn install
yarn start     # Geliştirme sunucusu
yarn build     # Production build
yarn test      # Testleri çalıştır
```

### Synapse Admin

```bash
cd www/admin
yarn install
yarn start     # Geliştirme sunucusu
yarn build     # Production build
yarn test      # Testleri çalıştır
```

## 📊 Teknoloji Stack

- **Frontend**: React 19, TypeScript
- **UI Framework**: Material-UI
- **State Management**: React Admin, TanStack Query
- **Build Tool**: Vite, Webpack
- **Backend**: Matrix Synapse (Python)
- **WebRTC**: LiveKit
- **Containerization**: Docker

## 🔐 Güvenlik

- End-to-end şifreleme (E2EE)
- Güvenli kimlik doğrulama
- XSS ve CSRF koruması
- HTTPS zorunlu (production)

## 📝 Lisans

Bu proje çeşitli açık kaynak lisansları altındadır:
- Element Web: AGPL-3.0 / GPL-3.0 / Commercial
- Synapse Admin: Apache-2.0
- Matrix Synapse: Apache-2.0

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some AmazingFeature'`)
4. Branch'inizi push edin (`git push origin feature/AmazingFeature`)
5. Pull Request açın

## 📞 İletişim

Proje Sahibi: DAI Teknoloji

GitHub: [daiteknoloji/Cravexv2](https://github.com/daiteknoloji/Cravexv2)

## 🙏 Teşekkürler

- [Element](https://element.io/) - Element Web
- [Matrix.org](https://matrix.org/) - Matrix protokolü ve Synapse
- [Awesome Technologies](https://github.com/Awesome-Technologies/synapse-admin) - Synapse Admin

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!






