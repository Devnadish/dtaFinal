import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { dateToString } from "@/lib/nadish"
import AddComment from "./AddComment"
import BloggerAvatar from "./BloggerAvatar";
import { Icon } from '@iconify/react';
import { auth } from "@/auth"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { getTranslations } from "next-intl/server";

interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  userImage: string;
  userEmail: string;
}

interface CommentsProps {
  initialComments: Comment[];
  blogSlug: string;
}

export default async function ShowComments({ initialComments, blogSlug }: CommentsProps) {
  const session = await auth()
  const t= await getTranslations("comments")

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="flex flex-col items-start justify-between space-y-4 pb-6">
          <div className="flex items-center gap-3 w-full">
            <div className="flex items-center gap-2 bg-primary/5 px-3 py-1.5 rounded-full">
              <Icon icon="fluent:comment-20-filled" className="w-5 h-5 text-primary/70" />
              <CardTitle className="text-sm text-primary/70">
                {initialComments.length} {initialComments.length === 1 ? 'Comment' : 'Comments'}
              </CardTitle>
            </div>
          </div>


          {!session ? (
            <Alert className="bg-muted/50 flex flex-row items-center gap-2 border-destructive/50">

              <AlertDescription className="flex items-center gap-2 text-muted-foreground">
              <Icon icon="solar:user-circle-linear" className="w-5 h-5" />
                <span>{t("loginToComment")}</span>
              </AlertDescription>

            </Alert>
          ) : (
            <AddComment blogSlug={blogSlug} />
          )}

          



        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            {initialComments.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No comments yet. Be the first to comment!</p>
              </div>
            ) : (
              initialComments.map((comment) => {
                const commentDate = comment.createdAt.toString()
                return (
                  <Card key={comment.id} className="border border-border/50 hover:border-border/80 transition-colors duration-200">
                    <CardContent className="pt-4">
                      <div className="flex flex-col space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <BloggerAvatar imageUrl={comment.userImage} userEmail={comment.userImage} />
                            <div className="flex flex-col">
                              <span className="text-sm font-medium">{comment.userEmail.split('@')[0]}</span>
                              <span className="text-xs text-muted-foreground">
                                {dateToString(commentDate)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-foreground/80 pl-12">{comment.content}</p>
                      </div>
                    </CardContent>
                  </Card>
                )
              })
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}