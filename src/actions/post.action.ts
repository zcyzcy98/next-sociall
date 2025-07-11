"use server";

import prisma from "@/lib/prisma";
import { getDbUserId } from "./user.action";
import { revalidatePath } from "next/cache";

export async function createPost(content: string, image: string) {
  try {
    const userId = await getDbUserId();
    const post = await prisma.post.create({
      data: {
        authorId: userId,
        content,
        image,
      },
    });

    revalidatePath("/");
    return {
      success: true,
      post,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
}

export async function getPosts() {
}
