import { useTranslation } from "react-i18next";
import { LegalDocumentLayout } from "@/components/legal/LegalDocumentLayout";
import { LegalHtmlBlock } from "@/components/legal/LegalHtmlBlock";

export default function MentionsLegales() {
  const { t } = useTranslation();
  return (
    <LegalDocumentLayout
      badge={null}
      title={t("legal.mentions.title")}
      description={t("legal.mentions.description")}
    >
      <LegalHtmlBlock html={t("legal.mentions.content")} />
    </LegalDocumentLayout>
  );
}
