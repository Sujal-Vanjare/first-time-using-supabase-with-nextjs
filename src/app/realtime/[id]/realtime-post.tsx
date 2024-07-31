"use client";
import supabase from "@/utils/supabase";
import { useEffect, useState } from "react";

type Post = {
  id: string;
  created_at: string;
  title: string;
};

export default function RealtimePost({ serverPost }: { serverPost: Post }) {
  const [post, setPost] = useState(serverPost);
  useEffect(() => {
    const channel = supabase
      .channel("realtime posts")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "posts",
          filter: `id=eq.${post.id}`,
        },
        (payload) => {
          console.log(payload);
          setPost(payload.new as Post);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, post, setPost]);
  return <pre>{JSON.stringify(post, null, 2)}</pre>;
}
