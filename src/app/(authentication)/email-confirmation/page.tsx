import EmailConfirmationForm from "@/components/forms/emailConfirmationForm";
import { EditEmailLink } from "@/components/links/editEmailLink";

export default function EmailConfirmationPage() {
  return (
    <>
      <EditEmailLink />
      <EmailConfirmationForm />
    </>
  );
}
