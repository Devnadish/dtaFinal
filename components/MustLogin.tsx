import { useLocale } from "next-intl";
import Text from "./Text";

const MustLogin =  () => {
  
  const locale = useLocale();
  const mustLogin = locale === "en" ? "Not Logged In .. You Must Login to Add a Question" : "لم تسجل الدخول .. يجب تسجيل الدخول لاضافة سؤال";
  


  return (
    <div className="text-foreground  bg-destructive rounded-md p-2 ">
      <Text variant="span" locale={locale}>{mustLogin}</Text>
    </div>
  );
};
export default MustLogin;
