import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { LegalAccordion } from "@/components/legal/LegalAccordion";
import { LegalDocumentLayout } from "@/components/legal/LegalDocumentLayout";
import { LegalHtmlBlock } from "@/components/legal/LegalHtmlBlock";

export default function Policy() {
  const { t } = useTranslation();
  const sections = t("legal.policy.sections", { returnObjects: true });
  const items = useMemo(
    () =>
      (Array.isArray(sections) ? sections : []).map((s) => ({
        id: s.id,
        title: s.title,
        body: <LegalHtmlBlock html={s.body} />,
      })),
    [sections]
  );

  return (
    <LegalDocumentLayout
      badge={t("legal.policy.badge")}
      title={t("legal.policy.title")}
      description={t("legal.policy.description")}
    >
      <LegalAccordion items={items} />
    </LegalDocumentLayout>
  );
}
