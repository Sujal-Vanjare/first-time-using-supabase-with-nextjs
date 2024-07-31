import supabase from "@/utils/supabase";
import RealtimePost from "./realtime-post";

export const revalidate = 0;

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

  return <RealtimePost serverPost={post ?? []} />;
}
