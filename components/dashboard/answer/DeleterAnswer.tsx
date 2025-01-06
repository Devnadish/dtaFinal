"use client";
import { Icon } from "@iconify/react";
import React from "react";
import { Button } from "@/components/ui/button";
import { deleteAnswer } from "@/app/[locale]/dashboard/quastion/actions/dashboard";

function DeleterAnswer({ AID, QID }: { AID: string; QID: string }) {
  const RemoveAnswer = async (AID: string, QID: string) => {
    await deleteAnswer(AID, QID);
  };
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => RemoveAnswer(AID, QID)}
    >
      <Icon icon="lucide:trash-2" />
    </Button>
  );
}

export default DeleterAnswer;
