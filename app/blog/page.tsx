import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import { blogPosts } from "@/data/blog-posts";

export default function BlogPage() {
  return (
    <PageLayout
      title="Blog"
      description="API’ler, araçlar ve geliştirme hakkında rehberler ve makaleler."
    >
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <img
              src={post.image}
              alt={post.title}
              className="h-56 w-full object-cover"
            />

            <div className="p-6">
              <div className="mb-3 flex items-center gap-3 text-xs text-[#2b2b2b]/50">
                <span className="rounded-full bg-[#fff3ec] px-3 py-1 font-medium text-[#d86f3d]">
                  {post.tag}
                </span>
                <span>{post.date}</span>
              </div>

              <h2 className="text-xl font-semibold text-[#2b2b2b]">
                {post.title}
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-[#2b2b2b]/60">
                {post.desc}
              </p>

              <div className="mt-5 flex items-center justify-between text-xs text-[#2b2b2b]/50">
                <span>KOI’S Editör</span>
                <span className="font-medium text-[#d86f3d]">
                  Oku →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </PageLayout>
  );
}