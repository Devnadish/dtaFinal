import { useRouter } from "next/navigation";
import { useTransition } from "react";

const useRouterPush = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const routerPush = (url: string) => {
    startTransition(() => {
      router.push(url);
    });
  };

  return {
    routerPush,
    isPending, // Optional: If you want to track the transition state
  };
};

export default useRouterPush;
