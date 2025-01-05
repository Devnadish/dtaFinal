"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/react";
import React from "react";
import { useActionState } from "react";
import { newComment } from "../actions/addComment";
import { ActionResponse } from "@/type/types";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useTranslations } from "next-intl";
const initialState: ActionResponse = {
    success: false,
    message: "",
};
function AddComment({ blogSlug }: { blogSlug: string }) {
    const [state, action, isPending] = useActionState(newComment, initialState);
    const t = useTranslations("comments")
    return (
        <form action={action} className="w-full flex flex-col items-start gap-2" autoComplete="on">
            <div className="flex w-full items-center justify-between gap-2">
                <Input
                    placeholder={t("commentPlaceholder")}
                    minLength={5}
                    maxLength={100}
                    autoComplete="street-address"
                    aria-describedby="comment-error"
                    name="comment"
                />
                <Input
                    defaultValue={blogSlug}
                    aria-describedby="blogSlug-error"
                    name="blogSlug"
                    type="hidden"
                />

                <Button type="submit" size={"icon"} disabled={isPending}>
                    {isPending ? <Icon icon="svg-spinners:6-dots-rotate" className="w-5 h-5" /> : <Icon icon="mynaui:send" className="w-5 h-5" />}
                </Button>
            </div>
            <div>
                {state?.message && (
                    <Alert variant={state.success ? "default" : "destructive"}   >
                        {state.success && (
                            <Icon
                                icon="solar:check-circle-bold"
                                className="w-4 h-4 text-emerald-500"
                            />
                        )}
                        <AlertDescription>{state.message}</AlertDescription>
                    </Alert>
                )}
            </div>
        </form>
    );
}

export default AddComment;
