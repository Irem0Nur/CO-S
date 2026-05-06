export const blogPosts = [
  {
    slug: "en-iyi-ucretsiz-api-2026",
    title: "En İyi 10 Ücretsiz API 2026",
    desc: "2026’da projelerinizde kullanabileceğiniz en popüler ve güvenilir ücretsiz API’leri keşfedin.",
    tag: "Rehber",
    date: "1 Mayıs 2026",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80",
    content: `
# En İyi 10 Ücretsiz API 2026

Günümüzde yazılım geliştirmek artık sıfırdan her şeyi yapmak anlamına gelmiyor. API’ler sayesinde karmaşık sistemleri dakikalar içinde uygulamana entegre edebilirsin.

Özellikle ücretsiz API’ler; hackathon, öğrenci projeleri ve MVP geliştirme süreçlerinde büyük avantaj sağlar.

## 1. OpenWeather API

Hava durumu verisi almak için en popüler API’lerden biridir. Günlük tahmin, lokasyon bazlı hava durumu ve hava kalitesi gibi veriler sunar.

## 2. Google Gemini API

Metin, görsel ve multimodal yapay zeka projeleri için güçlü bir seçenektir.

## 3. Groq API

Düşük gecikme süresiyle hızlı AI chatbot ve gerçek zamanlı uygulamalar için idealdir.

## 4. Hugging Face API

Açık kaynak yapay zeka modellerine erişmek isteyen geliştiriciler için güçlü bir platformdur.

## 5. REST Countries API

Ülkeler, bayraklar, para birimleri, diller ve nüfus gibi verileri sağlar.

## 6. News API

Haber uygulamaları ve içerik platformları için güncel haber verisi sunar.

## 7. JSONPlaceholder

Frontend geliştirme ve test projeleri için sahte veri sağlar.

## 8. OpenRouter API

Tek API üzerinden farklı yapay zeka modellerine erişim sağlar.

## 9. OpenRouteService API

Harita, rota ve mesafe hesaplama işlemleri için kullanılabilir.

## 10. Resend API

Modern email gönderim sistemleri için geliştirici dostu bir API’dir.

## Sonuç

Ücretsiz API’ler küçük projeler, hackathonlar ve MVP geliştirme süreçleri için büyük avantaj sağlar. Ancak API seçerken sadece ücretsiz olmasına değil; rate limit, dokümantasyon, güvenilirlik ve ölçeklenebilirlik konularına da dikkat edilmelidir.
    `,
  },
  {
    slug: "api-rate-limit-nasil-yonetilir",
    title: "API Rate Limit Nasıl Yönetilir?",
    desc: "API rate limitlerini aşmadan uygulamanızı optimize etmek için ipuçları ve en iyi uygulamalar.",
    tag: "Teknik",
    date: "28 Nisan 2026",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    content: `
# API Rate Limit Nasıl Yönetilir?

Modern uygulamaların çoğu API’ler üzerine kurulu. Ancak ücretsiz ya da ücretli fark etmeksizin neredeyse tüm servislerin bir sınırı vardır: rate limit.

Rate limit, belirli bir süre içinde API’ye gönderebileceğin maksimum istek sayısıdır.

## Rate Limit Neden Var?

API sağlayıcıları rate limit koyar çünkü:

- Sunucularını korumak ister
- Adil kullanım sağlamak ister
- Maliyeti kontrol altında tutmak ister
- Kötüye kullanımı engellemek ister

## 1. Caching Kullan

Aynı veriyi tekrar tekrar API’den çekmek yerine sonucu önbellekte sakla.

Bu yöntem:

- API çağrılarını azaltır
- Performansı artırır
- Kota tüketimini düşürür

## 2. Throttling Uygula

İstekleri kontrollü şekilde gönder. Aynı anda çok fazla istek atmak yerine belirli aralıklarla göndermek daha güvenlidir.

## 3. Retry ve Exponential Backoff

API limitine takıldığında hemen tekrar denemek yerine bekleme süresini kademeli artır.

Örneğin:

- İlk deneme başarısız
- 1 saniye bekle
- Sonra 2 saniye bekle
- Sonra 4 saniye bekle

Bu yaklaşım API’yi spamlamadan tekrar deneme yapmanı sağlar.

## 4. Queue Sistemi Kur

Yoğun istekleri sıraya almak için queue sistemi kullanılabilir.

Kullanılabilecek araçlar:

- BullMQ
- RabbitMQ
- Redis Queue

## 5. Fallback API Kullan

Tek API’ye bağımlı kalma. Bir API çalışmazsa başka bir sağlayıcıya geçebilen sistemler daha dayanıklıdır.

## 6. Rate Limit Header’larını Oku

Birçok API kalan limit bilgisini response header içinde verir. Bu bilgiye göre sistemi dinamik yönetebilirsin.

## 7. Kullanıcı Bazlı Limit Koy

Kendi sisteminde de kullanıcı başına limit koymalısın. Böylece tek bir kullanıcı tüm kotanı tüketemez.

## Sonuç

Rate limit yönetimi sadece teknik detay değildir. Ölçeklenebilir, stabil ve profesyonel API sistemlerinin temelidir.
    `,
  },
  {
    slug: "rest-api-vs-graphql",
    title: "REST API vs GraphQL: Hangisi Daha İyi?",
    desc: "Modern web uygulamaları için REST API ve GraphQL arasındaki farkları öğrenin.",
    tag: "Karşılaştırma",
    date: "25 Nisan 2026",
    image:
      "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1200&q=80",
    content: `
# REST API vs GraphQL: Hangisi Daha İyi?

API tasarımı, bir uygulamanın performansını ve ölçeklenebilirliğini doğrudan etkiler. REST yıllardır kullanılan klasik yaklaşımdır. GraphQL ise modern veri sorgulama ihtiyaçları için güçlü bir alternatiftir.

## REST API Nedir?

REST, HTTP tabanlı klasik API mimarisidir.

Örneğin:

GET /users/1  
GET /users/1/posts

Her kaynak için ayrı endpoint bulunur.

## GraphQL Nedir?

GraphQL tek endpoint üzerinden çalışan bir sorgulama dilidir. Frontend sadece ihtiyacı olan veriyi ister.

Örneğin kullanıcı, post ve yorum verilerini tek istekle alabilir.

## Veri Çekme Mantığı

REST’te backend ne döndürürse frontend onu alır. Bu bazen gereksiz veri taşınmasına neden olur.

GraphQL’de ise frontend istediği alanları seçebilir.

## Performans

REST basit projelerde hızlı ve yeterlidir. GraphQL ise karmaşık veri ilişkilerinde daha esnek olabilir.

Ancak GraphQL kötü tasarlanırsa backend tarafında ağır sorgular oluşabilir.

## Caching

REST, HTTP cache ile daha kolay çalışır. GraphQL’de cache yönetimi daha dikkatli yapılmalıdır.

## Geliştirme Kolaylığı

REST öğrenmesi daha kolaydır. GraphQL ise schema, resolver ve query yapısı nedeniyle biraz daha fazla öğrenme süreci ister.

## Ne Zaman REST Kullanılır?

- Küçük projeler
- Basit CRUD sistemleri
- Hızlı MVP geliştirme
- Kolay cache ihtiyacı
- Basit backend yapıları

## Ne Zaman GraphQL Kullanılır?

- Büyük projeler
- Web ve mobil uygulamanın aynı API’yi kullanması
- Karmaşık veri ilişkileri
- Frontend’in veri üzerinde daha fazla kontrol istemesi

## Sonuç

REST mi GraphQL mi sorusunun tek cevabı yoktur. Küçük ve hızlı projelerde REST, büyük ve veri yoğun projelerde GraphQL daha avantajlı olabilir.
    `,
  },
  {
    slug: "api-guvenligi-temel-prensipler",
    title: "API Güvenliği: Temel Prensipler",
    desc: "API’lerinizi güvende tutmak için bilmeniz gereken temel güvenlik uygulamaları.",
    tag: "Güvenlik",
    date: "20 Nisan 2026",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    content: `
# API Güvenliği: Temel Prensipler

Modern uygulamaların kalbi API’lerdir. Ancak bir API güvenli değilse bütün sistem savunmasız hale gelebilir.

API güvenliği, sonradan eklenecek bir özellik değil; projenin en başından itibaren düşünülmesi gereken temel bir mimari konudur.

## 1. Authentication

Authentication, API’ye kimin eriştiğini doğrulama sürecidir.

Yaygın yöntemler:

- API Key
- JWT
- OAuth 2.0

## 2. Authorization

Authorization, kullanıcının ne yapabileceğini belirler.

Örneğin:

- Admin tüm verilere erişebilir
- Normal kullanıcı sadece kendi verisini görebilir

Kimlik doğrulama ve yetkilendirme aynı şey değildir.

## 3. HTTPS Kullan

API trafiği mutlaka HTTPS üzerinden yapılmalıdır. HTTP kullanmak veri güvenliği açısından ciddi risk oluşturur.

## 4. Rate Limiting

API’ni spam ve kötüye kullanımdan korumak için rate limit uygulanmalıdır.

Bu sayede:

- DDoS etkisi azaltılır
- Spam istekler engellenir
- API maliyeti kontrol altında tutulur

## 5. Input Validation

Kullanıcıdan gelen veriye asla doğrudan güvenilmemelidir. Tüm inputlar kontrol edilmelidir.

Bu sayede:

- SQL Injection
- XSS
- Zararlı payload

gibi saldırılar engellenebilir.

## 6. API Key Güvenliği

API key asla frontend tarafında açık şekilde tutulmamalıdır.

Doğru yaklaşım:

- Backend tarafında sakla
- .env dosyası kullan
- GitHub’a pushlama
- Gerektiğinde key rotation yap

## 7. Logging ve Monitoring

Şüpheli istekleri, hata oranlarını ve trafik artışlarını izlemek gerekir.

İzlenmesi gerekenler:

- Hata oranları
- Ani trafik artışları
- Başarısız giriş denemeleri
- Şüpheli IP adresleri

## 8. CORS Yönetimi

CORS ayarlarında herkese açık wildcard kullanmak risklidir. Sadece güvenilir domainlere izin verilmelidir.

## 9. Token Süresi

JWT veya access token kullanılıyorsa tokenların süresi sınırlı olmalıdır.

Çalınan bir token uzun süre geçerli kalmamalıdır.

## Sonuç

API güvenliği bir seçenek değil, zorunluluktur. Sağlam authentication, authorization, rate limit ve input validation ile daha güvenli bir sistem kurabilirsin.
    `,
  },
  {
    slug: "ucretsiz-ai-apileri-nasil-secilir",
    title: "Ücretsiz AI API’leri Nasıl Seçilir?",
    desc: "LLM, embedding ve image generation servislerinde ücretsiz planları karşılaştırın.",
    tag: "AI",
    date: "18 Nisan 2026",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
    content: `
# Ücretsiz AI API’leri Nasıl Seçilir?

Yapay zeka projeleri geliştirmek artık çok daha kolay. Ancak onlarca ücretsiz AI API arasında doğru seçimi yapmak her zaman basit değildir.

Yanlış seçim; performans sorunlarına, rate limit problemlerine, güvenlik risklerine ve projenin ölçeklenememesine neden olabilir.

## 1. Kullanım Amacını Belirle

Her AI API her iş için uygun değildir.

Örneğin:

- Chatbot için LLM API
- Görsel üretim için image generation API
- Sesli asistan için speech-to-text API
- Analiz için embedding API

kullanılabilir.

## 2. Performans ve Hız

Gerçek zamanlı chatbot yapıyorsan API’nin yanıt süresi çok önemlidir. Yavaş çalışan API kullanıcı deneyimini kötü etkiler.

## 3. Rate Limit ve Kota

Ücretsiz API’lerde en kritik konulardan biri kullanım sınırıdır.

Kontrol etmen gerekenler:

- Dakikada kaç istek hakkı var?
- Günlük kullanım limiti nedir?
- Token sınırı var mı?
- Ücretsiz plan ticari kullanım için uygun mu?
- Kart bilgisi istiyor mu?

## 4. Model Kalitesi

Her model aynı kalitede çıktı üretmez. Bazı modeller kod yazmada iyidir, bazıları metin üretiminde, bazıları görsel analizde daha başarılıdır.

## 5. Türkçe Performansı

Türkçe proje geliştiriyorsan modelin Türkçe anlama ve üretme kalitesini mutlaka test etmelisin.

## 6. Multi-Model Destek

Tek bir sağlayıcıya bağlı kalmak risklidir. Farklı modelleri tek API üzerinden kullanmak daha esnek bir yapı sağlar.

## 7. Dokümantasyon

İyi bir API’nin dokümantasyonu açık, anlaşılır ve örneklerle desteklenmiş olmalıdır.

## 8. Güvenlik ve Gizlilik

Kullanıcı verilerini işliyorsan API sağlayıcısının veri politikalarını mutlaka incelemelisin.

## 9. Ölçeklenebilirlik

Bugün ücretsiz olan sistem yarın ücretli plana geçmeni gerektirebilir. Bu yüzden fiyatlandırma yapısı da baştan incelenmelidir.

## Sonuç

Ücretsiz AI API seçmek, en popüler olanı seçmek değildir. Asıl önemli olan, projenin ihtiyacına en uygun API’yi seçmektir.
    `,
  },
  
];