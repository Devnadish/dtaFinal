import {
  NextResponse,
  type NextFetchEvent,
  type NextRequest,
} from "next/server";

import { CustomMiddleware } from "./chain";

export function withMiddleware2(middleware: CustomMiddleware) {
  return async (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse
  ) => {
    // Perform whatever logic the second middleware needs to do
    const pathname = request.nextUrl.pathname;
    console.log("middleware2 =>", { pathname });
    console.log("-------------Test middle ware 1------------- ");

     
    return middleware(request, event, response);
  };
}
