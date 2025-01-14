import {
  CreateFakeTags,
  CreateTag,
  GetAllTags,
} from "@/actions/tag/tagActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Icon } from "@iconify/react"; // Import Iconify
import React from "react";

async function TagsPage() {
  const tags = await GetAllTags();
  // const fakeTags = await CreateFakeTags(10);

  return (
    <div dir="ltr" className="flex flex-col gap-4 p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Tags Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AddTagForm />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Existing Tags</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {tags.map((tag) => (
            <div
              key={tag.id}
              className="flex flex-row items-center justify-between p-4 bg-background rounded-lg border border-border hover:border-primary transition-colors duration-200"
            >
              <p className="text-lg font-medium">{tag.tag}</p>
              <div className="flex flex-row gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Icon icon="mdi:information-outline" className="h-4 w-4" />{" "}
                  {/* Info Icon */}
                  Info
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Icon icon="mdi:pencil-outline" className="h-4 w-4" />{" "}
                  {/* Edit Icon */}
                  Edit
                </Button>
                <Button variant="destructive" size="sm" className="gap-2">
                  <Icon icon="mdi:trash-can-outline" className="h-4 w-4" />{" "}
                  {/* Delete Icon */}
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export default TagsPage;

const AddTagForm = () => {
  async function CreateNewTag(formData: FormData) {
    "use server";
    const tag = formData.get("tag");
    await CreateTag(tag as string);
  }

  return (
    <form action={CreateNewTag} className="flex flex-row gap-2">
      <Input placeholder="Add a new tag" name="tag" className="flex-1" />
      <Button type="submit" className="gap-2">
        <Icon icon="mdi:plus-circle-outline" className="h-4 w-4" />{" "}
        {/* Add Icon */}
        Add Tag
      </Button>
    </form>
  );
};
