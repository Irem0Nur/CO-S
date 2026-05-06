import Link from "next/link";
import { notFound } from "next/navigation";
import PageLayout from "@/components/PageLayout";
import { blogPosts } from "@/data/blog-posts";

type BlogDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;

  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <PageLayout title={post.title} description={post.desc}>
      <article className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm">
        <img
          src={post.image}
          alt={post.title}
          className="h-80 w-full object-cover"
        />

        <div className="p-8 md:p-10">
          <div className="mb-6 flex items-center gap-3 text-xs text-[#2b2b2b]/50">
            <span className="rounded-full bg-[#fff3ec] px-3 py-1 font-medium text-[#d86f3d]">
              {post.tag}
            </span>
            <span>{post.date}</span>
            <span>KOI’S Editör</span>
          </div>

          <div className="space-y-5 text-base leading-8 text-[#2b2b2b]/75">
            {post.content
              .trim()
              .split("\n")
              .filter(Boolean)
              .map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
          </div>

          <div className="mt-10 border-t border-black/10 pt-6">
            <Link
              href="/blog"
              className="font-medium text-[#d86f3d] hover:underline"
            >
              ← Tüm bloglara dön
            </Link>
          </div>
        </div>
      </article>
    </PageLayout>
  );
}