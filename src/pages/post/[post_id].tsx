import * as React from "react";
import { useRouter } from "next/router";
import PostComponent from "@/components/post";

export default function Search() {
  const router = useRouter();
  const post_id: number = Number(router.query?.post_id);
  return <PostComponent post_id={post_id} />;
}
