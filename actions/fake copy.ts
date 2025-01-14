"use server";
import db from "../lib/prisma";
import { faker } from "@faker-js/faker";

// Helper function to create tags
async function createTags() {
  const tags = ["cat", "dog", "mouse", "bird", "fish", "rabbit", "hamster"];
  console.time("createTags");

  // Check which tags already exist in the database
  const existingTags = await db.tag.findMany({
    where: {
      tag: { in: tags },
    },
    select: { tag: true },
  });

  // Extract the names of existing tags
  const existingTagNames = existingTags.map((t) => t.tag);

  // Filter out tags that already exist
  const newTags = tags.filter((tag) => !existingTagNames.includes(tag));

  // Insert only new tags
  if (newTags.length > 0) {
    await db.tag.createMany({
      data: newTags.map((tag) => ({ tag })),
    });
  }

  console.timeEnd("createTags");
  return tags;
}

// Helper function to create a FAQ with answers, comments, images, voice recordings, and interactions
async function createFAQ(tags: string[]) {
  const question = faker.lorem.sentence({ min: 3, max: 15 });
  const questionData = {
    slug: faker.helpers.slugify(question),
    question,
    userEmail: faker.internet.email(),
    viewerCount: faker.number.int({ min: 0, max: 100 }),
    published: true,
    rejected: false,
    gotAnswer: true,
  };

  console.time("createFAQ");
  const createdFAQ = await db.faq.create({
    data: questionData,
  });
  console.timeEnd("createFAQ");

  // Add tags to the FAQ
  const selectedTags = faker.helpers.arrayElements(tags, { min: 1, max: 3 });
  console.time("addTagsToFAQ");
  await db.tagged.createMany({
    data: selectedTags.map((tag) => ({
      faqId: createdFAQ.id,
      tag,
    })),
  });
  console.timeEnd("addTagsToFAQ");

  // Add answers to the FAQ
  const numAnswers = faker.number.int({ min: 1, max: 5 });
  const answers = Array.from({ length: numAnswers }, () => ({
    faqId: createdFAQ.id,
    content: faker.lorem.paragraph(),
    userEmail: faker.internet.email(),
  }));

  console.time("createAnswers");
  const createdAnswers = await Promise.all(
    answers.map((answer) => db.answer.create({ data: answer }))
  );
  console.timeEnd("createAnswers");

  // Add comments to each answer
  console.time("createComments");
  for (const answer of createdAnswers) {
    const numComments = faker.number.int({ min: 0, max: 3 });
    if (numComments > 0) {
      const comments = Array.from({ length: numComments }, () => ({
        answerId: answer.id,
        content: faker.lorem.sentence(),
        userEmail: faker.internet.email(),
        userImage: faker.image.avatar(),
      }));
      await db.comment.createMany({ data: comments });
    }
  }
  console.timeEnd("createComments");

  // Add images to the FAQ
  console.time("addImagesToFAQ");
  const numImages = faker.number.int({ min: 0, max: 3 });
  if (numImages > 0) {
    const images = Array.from({ length: numImages }, () => ({
      faqId: createdFAQ.id,
      url: `https://picsum.photos/seed/${faker.string.uuid()}/200/300`, // Use a reliable image service
      publicId: faker.string.uuid(),
    }));
    await db.faqImage.createMany({ data: images });
  }
  console.timeEnd("addImagesToFAQ");

  // Add voice recordings to the FAQ
  console.time("addVoiceRecordingsToFAQ");
  const numVoiceRecordings = faker.number.int({ min: 0, max: 2 });
  if (numVoiceRecordings > 0) {
    const voiceRecordings = Array.from({ length: numVoiceRecordings }, () => ({
      faqId: createdFAQ.id,
      url: faker.internet.url(),
      publicId: faker.string.uuid(),
    }));
    await db.faqVoiceRecording.createMany({ data: voiceRecordings });
  }
  console.timeEnd("addVoiceRecordingsToFAQ");

  // Add interactions to the FAQ
  console.time("addInteractionsToFAQ");
  const numInteractions = faker.number.int({ min: 0, max: 10 });
  if (numInteractions > 0) {
    const interactions = Array.from({ length: numInteractions }, () => ({
      faqId: createdFAQ.id,
      userEmail: faker.internet.email(),
      userImage: faker.image.avatar(),
      isLoved: faker.datatype.boolean(),
      isDisliked: faker.datatype.boolean(),
    }));
    await db.faqInteraction.createMany({ data: interactions });
  }
  console.timeEnd("addInteractionsToFAQ");

  return createdFAQ;
}

// Server action to create fake data
export async function CreateFakeData() {
  try {
    console.log("Clearing existing data...");
    console.time("deleteData");

    // Delete all records in the correct order to respect relationships
    await db.comment.deleteMany();
    await db.answer.deleteMany();
    await db.tagged.deleteMany();
    await db.faqInteraction.deleteMany(); // Delete interactions before FAQs
    await db.faqImage.deleteMany();
    await db.faqVoiceRecording.deleteMany();
    await db.faq.deleteMany(); // Delete FAQs after their related records
    await db.tag.deleteMany();

    console.timeEnd("deleteData");

    // Create tags first
    console.log("Creating tags...");
    const tags = await createTags();

    // Create FAQs with related data
    const numFAQs = 30; // Number of FAQs to create
    const fakeData = [];

    console.log(
      `Creating ${numFAQs} FAQs with answers, comments, images, voice recordings, and interactions...`
    );
    for (let i = 0; i < numFAQs; i++) {
      console.log(`Creating FAQ ${i + 1}...`);
      const createdFAQ = await createFAQ(tags);
      fakeData.push(createdFAQ);
    }

    console.log("DONE creating fake data.");
    return fakeData;
  } catch (error) {
    console.error("Error creating fake data:", error);
    throw new Error("Failed to create fake data.");
  }
}
