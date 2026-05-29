import { PortableText } from "@portabletext/react";

import type { PortableTextValue } from "@/sanity/types";

export function PortableContent({ value }: { value?: PortableTextValue }) {
  if (!value?.length) {
    return null;
  }

  return (
    <div className="rich-text max-w-none">
      <PortableText value={value} />
    </div>
  );
}
