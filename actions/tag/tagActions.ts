"use server";
import db from "@/lib/prisma";
import { faker } from "@faker-js/faker";
import { revalidatePath } from "next/cache";

export async function GetAllTags() {
  const tags = await db.tag.findMany();
  return tags;
}

export async function CreateTag(tag: string) {
  const newTag = await db.tag.create({ data: { tag: tag } });
  revalidatePath("/dashboard/tags");
  return newTag;
}

export async function DeleteTag(id: string) {
  const deletedTag = await db.tag.delete({ where: { id } });
  return deletedTag;
}

export async function UpdateTag(id: string, tag: string) {
  const updatedTag = await db.tag.update({ where: { id }, data: { tag: tag } });
  return updatedTag;
}

export async function CreateFakeTags(count: number) {
  // Ensure you have faker installed
  const fakeTags = Array.from({ length: count }, () =>
    faker.commerce.department()
  ); // 'Garden';

  const createdTags = await Promise.all(
    fakeTags.map((tag) => db.tag.create({ data: { tag } }))
  );

  return createdTags;
}

export async function GetFaqTagsByQID(QID: string | undefined) {
  const tags = await db.faq.findUnique({
    where: { id: QID },
    include: { tagged: true },
  });

  return tags;
}

export async function AddFaqTags(QID: string, tags: string[]) {
  // Delete existing tags for the given QID
  await db.tagged.deleteMany({ where: { faqId: QID } });

  // If no tags provided, use 'general' as the default tag
  const effectiveTags = tags.length > 0 ? tags : ["general"];

  // Create new tags
  const addedTags = await db.tagged.createMany({
    data: tags.map((tag) => ({ tag: tag.toLowerCase(), faqId: QID })),
  });
  revalidatePath("/dashboard/quastion/[qid]");
  return addedTags;
}
