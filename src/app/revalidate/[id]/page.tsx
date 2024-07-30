import supabase from "@/utils/supabase";

export async function generateStaticParams() {
  const { data: posts } = await supabase.from("posts").select("id");
  return posts ?? [];
}

// Dynamic segments not included in generateStaticParams will return a 404.
export const dynamicParams = false;

export const revalidate = 60;

export default async function Post({
  params: { id },
}: {
  params: { id: string };
}) {
  const { data: post } = await supabase
    .from("posts")
    .select()
    .match({ id })
    .single();
  return <pre>{JSON.stringify(post, null, 2)}</pre>;
}
