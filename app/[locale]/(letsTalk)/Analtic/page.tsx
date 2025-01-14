import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getFaqAnalytics } from "./actions/analitic";
import Link from "next/link";
import { BarChart2, Image, MessageCircle, Mic } from "lucide-react"; // Import icons

const trimText = (text: string | undefined | null, maxLength: number) => {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

export default async function FaqAnalytics() {
  const data = await getFaqAnalytics();

  // Calculate summary data
  const totalFaqs = data.length;
  const totalImages = data.reduce((sum, faq) => sum + faq.imageCount, 0);
  const totalVoiceRecordings = data.reduce(
    (sum, faq) => sum + faq.voiceRecordingCount,
    0
  );
  const totalComments = data.reduce(
    (sum, faq) =>
      sum +
      faq.commentsPerAnswer.reduce(
        (acc, answer) => acc + answer.commentCount,
        0
      ),
    0
  );

  return (
    <div className="p-6 bg-gradient-to-br from-secondary to-background min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-2">
          <BarChart2 className="w-8 h-8 text-blue-600" />
          FAQ Analytics Dashboard
        </h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-blue-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total FAQs
              </CardTitle>
              <BarChart2 className="w-4 h-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {totalFaqs}
              </div>
              <p className="text-xs text-gray-500">Active questions</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-green-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Images
              </CardTitle>
              <Image className="w-4 h-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {totalImages}
              </div>
              <p className="text-xs text-gray-500">Attached images</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-purple-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Voice Recordings
              </CardTitle>
              <Mic className="w-4 h-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {totalVoiceRecordings}
              </div>
              <p className="text-xs text-gray-500">Audio responses</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-orange-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Comments
              </CardTitle>
              <MessageCircle className="w-4 h-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {totalComments}
              </div>
              <p className="text-xs text-gray-500">User interactions</p>
            </CardContent>
          </Card>
        </div>

        {/* Table Section */}
        <Card className="bg-secondary shadow-lg overflow-hidden">
          <Table>
            <TableCaption className="text-gray-500 py-4">
              Comprehensive FAQ Analytics Overview
            </TableCaption>
            <TableHeader>
              <TableRow className="bg-gray-50 hover:bg-gray-100">
                <TableHead className="text-gray-700 font-semibold">
                  Question
                </TableHead>
                <TableHead className="text-gray-700 font-semibold">
                  Tags
                </TableHead>
                <TableHead className="text-gray-700 font-semibold text-center">
                  Images
                </TableHead>
                <TableHead className="text-gray-700 font-semibold text-center">
                  Voice Recordings
                </TableHead>
                <TableHead className="text-gray-700 font-semibold text-center">
                  Answers
                </TableHead>
                <TableHead className="text-gray-700 font-semibold">
                  Comments Distribution
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((faq) => (
                <TableRow
                  key={faq.id}
                  className="hover:bg-gray-50 transition-all duration-200"
                >
                  <TableCell className="font-medium">
                    <Link
                      href={`/faq/${faq.id}`}
                      className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                    >
                      {trimText(faq.question, 50)}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {faq?.tags?.map((tag) => (
                        <Badge
                          key={tag.id}
                          variant="secondary"
                          className="bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                        >
                          {tag.tag}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant="outline"
                      className="bg-blue-50 text-blue-600"
                    >
                      {faq.imageCount}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant="outline"
                      className="bg-purple-50 text-purple-600"
                    >
                      {faq.voiceRecordingCount}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-600"
                    >
                      {faq.answerCount}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {faq.commentsPerAnswer.map((answer) => (
                        <div
                          key={answer.answerId}
                          className="flex items-center gap-2 text-sm"
                        >
                          <Badge
                            variant="outline"
                            className="bg-orange-50 text-orange-600"
                          >
                            {trimText(answer?.answerId, 10)}
                          </Badge>
                          <span className="text-gray-400 text-xs">
                            {answer.commentCount} cmt
                          </span>
                        </div>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}
