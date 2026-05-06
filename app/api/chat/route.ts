import { NextRequest } from "next/server";
import { getNextKey } from "@/lib/hf-client";
import { providers } from "@/data/providers";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message) {
      return Response.json(
        { error: "Mesaj boş geldi." },
        { status: 400 }
      );
    }

    const key = getNextKey();

    const providerContext = providers
      .map((p) => {
        return `[${p.category.toUpperCase()}] ${p.name}
  Açıklama: ${p.description}
  Ücretsiz detay: ${p.freeDetails}
  Etiketler: ${p.tags.join(", ")}
  Kart gerekli mi: ${p.noCardRequired ? "Hayır (kart gerektirmez)" : "Evet (kart gerekebilir)"}`;
      })
      .join("\n\n");

    const providerNames = providers.map((p) => p.name).join(", ");

    const hfRes = await fetch("https://router.huggingface.co/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "meta-llama/Llama-3.1-8B-Instruct",
        messages: [
          {
            role: "system",
            content: `Sen KOI'S platformunun Türkçe konuşan yapay zeka asistanısın. Adın Koi.

KOI'S, yazılımcıların hangi API'yi veya servisi kullanacağını bilmelerine gerek kalmadan, ihtiyaçlarını anlayıp doğru ücretsiz servise yönlendiren bir platformdur.

Amacın: Kullanıcının ne yapmak istediğini anlamak ve KOI'S listesindeki en uygun provider(ları) önererek işini kolaylaştırmak.

KOI'S'taki tüm providerlar:
${providerContext}

---

DAVRANIŞ KURALLARI:

1. KULLANICININ AMACINI ANLA
   - Kullanıcı teknik terim bilmeyebilir. "Kullanıcı girişi yapmak istiyorum" → Auth öner. "Resim yüklemek istiyorum" → Storage öner. "Uygulama hata veriyor" → Monitoring öner.
   - Kullanıcı "ne kullanayım" diye sorarsa ne yapmak istediğini sor.

2. SADECE KOI'S LİSTESİNDEKİ PROVIDERLARI öner. Listede olmayan bir şeyi asla önerme.

3. MAKSİMUM 3 PROVIDER öner.

4. Kullanıcı "kart istemiyorum" veya "ücretsiz" diyorsa sadece "Kart gerekli mi: Hayır" olanları öner.

5. Listede uygun servis yoksa "KOI'S listesinde şu an buna uygun bir provider bulunmuyor." de.

6. KOD ÖRNEĞI VERME — sadece kullanıcı özellikle isterse ver.

7. Türkçe konuş, samimi ve anlaşılır ol.

8. Provider adlarını KESİNLİKLE şu listeden olduğu gibi yaz, değiştirme:
${providerNames}

---

CEVAP FORMATI — Her provider için tam olarak bu yapıyı kullan:

🔹 Provider Adı
[Kullanıcının amacına özel, akıcı Türkçe 1-2 cümle açıklama.]
✅ [Ücretsiz plan detayı. Kart gerekmiyorsa bunu belirt.]

Birden fazla öneri varsa aralarına boş satır bırak.
Önerilerin ardından kısa bir yönlendirme cümlesi ekle.
Markdown bold (**) veya link ([isim](url)) kullanma. Düz metin yaz.`,
          },
          {
            role: "user",
            content: message,
          },
        ],
        max_tokens: 600,
        stream: false,
      }),
    });

    const text = await hfRes.text();

    let data: any;

    try {
      data = JSON.parse(text);
    } catch {
      return Response.json(
        { error: "HF JSON dönmedi: " + text.slice(0, 300) },
        { status: 500 }
      );
    }

    if (!hfRes.ok) {
      return Response.json(
        {
          error:
            data?.error?.message ||
            data?.error ||
            data?.message ||
            JSON.stringify(data),
        },
        { status: hfRes.status }
      );
    }

    return Response.json({
      answer:
        data.choices?.[0]?.message?.content ||
        "Cevap alınamadı.",
    });
  } catch (error: any) {
    return Response.json(
      { error: "Sunucu hatası: " + error.message },
      { status: 500 }
    );
  }
}