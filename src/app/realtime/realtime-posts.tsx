"use client";
import supabase from "@/utils/supabase";
import { useEffect, useState } from "react";

type Post = {
  id: string;
  created_at: string;
  title: string;
};

export default function RealtimePosts({
  serverPosts,
}: {
  serverPosts: Post[];
}) {
  const [posts, setPosts] = useState(serverPosts);
  useEffect(() => {
    const channel = supabase
      .channel("realtime posts")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "posts",
        },
        (payload) => {
          //   console.log(payload);
          setPosts([...posts, payload.new as Post]);
        }
      )

      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, posts, setPosts]);
  return <pre>{JSON.stringify(posts, null, 2)}</pre>;
}
