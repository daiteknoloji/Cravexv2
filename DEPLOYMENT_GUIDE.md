# 🚀 Cravex v2 Deployment Guide

## 📊 Mimari

```
┌─────────────────────────────────────────┐
│  NETLIFY (Frontend - Ücretsiz)          │
├─────────────────────────────────────────┤
│  • Element Web                           │
│  • Admin Panel                           │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│  RAILWAY (Backend - $5/ay)              │
├─────────────────────────────────────────┤
│  • Matrix Synapse                        │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│  NEON / PLANETSCALE (DB - Ücretsiz)     │
├─────────────────────────────────────────┤
│  • PostgreSQL Database                   │
└─────────────────────────────────────────┘
```

---

## 1️⃣ Database Setup (Neon.tech - ÖNERİLEN)

### Neon PostgreSQL (Ücretsiz 0.5GB):

1. **Neon.tech'e Kaydol:**
   - https://neon.tech → Sign up
   - Create New Project
   - Region: EU (Amsterdam)
   
2. **Database Bilgilerini Kaydet:**
   ```
   Host: ep-xxx-xxx.eu-central-1.aws.neon.tech
   Database: neondb
   User: postgres_user
   Password: xxx
   Port: 5432
   ```

3. **Connection String:**
   ```
   postgres://user:password@host:5432/neondb?sslmode=require
   ```

---

## 2️⃣ Railway Deployment (Synapse Backend)

### A. Railway'e Proje Ekle:

1. **Railway.app'e Git:**
   - https://railway.app → Login with GitHub
   - New Project → Deploy from GitHub repo
   - `daiteknoloji/Cravexv2` repository'sini seç

2. **Service Adı:**
   - `synapse` (railway.toml otomatik kullanılacak)

### B. Environment Variables Ekle:

Railway Dashboard → Synapse Service → Variables:

```bash
# PostgreSQL (Neon'dan aldığınız bilgiler)
POSTGRES_USER=your_neon_user
POSTGRES_PASSWORD=your_neon_password
POSTGRES_DB=neondb
POSTGRES_HOST=ep-xxx.eu-central-1.aws.neon.tech
POSTGRES_PORT=5432

# Synapse Settings
SYNAPSE_SERVER_NAME=${RAILWAY_PUBLIC_DOMAIN}
SYNAPSE_REPORT_STATS=no

# Security (Generate random values)
MACAROON_SECRET_KEY=<random-32-char-string>
REGISTRATION_SHARED_SECRET=<random-32-char-string>
FORM_SECRET=<random-32-char-string>
```

**Random String Oluştur:**
```bash
# PowerShell'de:
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | % {[char]$_})
```

### C. Public Domain Ayarla:

1. Railway → Settings → Networking
2. "Generate Domain" → `xxx.up.railway.app`
3. Bu URL'i not et!

---

## 3️⃣ Netlify Deployment (Frontend)

### A. Element Web Deploy:

1. **Netlify'e Git:**
   - https://netlify.com → Login
   - Sites → Add new site → Deploy manually

2. **Drag & Drop:**
   - `www/element-web/webapp` klasörünü sürükle bırak
   
3. **Site Settings:**
   - Site name: `cravex-element` (istediğiniz isim)
   - Domain: `cravex-element.netlify.app`

4. **Config Güncelle:**
   - Site ayarlarından "Environment variables" ekle:
   - (Gerekirse config.json'u güncelleyip yeniden deploy et)

### B. Admin Panel Deploy:

1. **Yeni Site Oluştur:**
   - Netlify → Add new site → Deploy manually

2. **Drag & Drop:**
   - `www/admin/dist` klasörünü sürükle bırak

3. **Site Settings:**
   - Site name: `cravex-admin`
   - Domain: `cravex-admin.netlify.app`

---

## 4️⃣ CORS Ayarları Güncelle

Railway Synapse deployed olduktan sonra:

1. **Railway URL'i al:**
   - Örn: `https://synapse-production.up.railway.app`

2. **homeserver-postgres.yaml Güncelle:**
   ```yaml
   cors_origins:
     - https://cravex-element.netlify.app
     - https://cravex-admin.netlify.app
   
   web_client_location: https://cravex-element.netlify.app
   ```

3. **GitHub'a Push Et:**
   ```bash
   git add homeserver-postgres.yaml
   git commit -m "Update CORS for Netlify URLs"
   git push origin main
   ```

4. Railway otomatik redeploy yapacak.

---

## 5️⃣ Test

### Element Web Test:
1. `https://cravex-element.netlify.app` aç
2. "Create Account" → Kullanıcı oluştur
3. Giriş yap ve test et

### Admin Panel Test:
1. `https://cravex-admin.netlify.app` aç
2. Synapse URL: `https://synapse-production.up.railway.app`
3. Admin hesabıyla giriş yap

---

## 📊 Maliyet Özeti

| Servis | Plan | Maliyet |
|--------|------|---------|
| Netlify (Element Web) | Starter | **$0/ay** |
| Netlify (Admin Panel) | Starter | **$0/ay** |
| Railway (Synapse) | Hobby | **$5/ay** |
| Neon (PostgreSQL) | Free | **$0/ay** |
| **TOPLAM** | | **$5/ay** |

---

## 🔧 Troubleshooting

### Synapse Başlamıyor:
- Railway logs kontrol et
- PostgreSQL connection string doğru mu?
- Environment variables eklenmiş mi?

### Element Web Synapse'e Bağlanamıyor:
- CORS ayarları doğru mu?
- Railway public domain aktif mi?
- config.json'da URL doğru mu?

### Admin Panel Bağlanamıyor:
- dist/config.json'da restrictBaseUrl doğru mu?
- Synapse health check çalışıyor mu? (`/health` endpoint)

---

## 🎉 Tebrikler!

Artık production-ready bir Matrix sunucunuz var!

- **Element Web:** Modern chat arayüzü
- **Admin Panel:** Kullanıcı yönetimi
- **Synapse:** Güvenli backend
- **PostgreSQL:** Scalable database

**Enjoy! 🚀**




