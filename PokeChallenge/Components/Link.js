import React from "react";
import NextLink from "next/link";
import { Link as ZeitLink } from "@zeit-ui/react";

function Link({ href, as, scroll, ...props }) {
  if (!href) return <ZeitLink {...props} />;
  return (
    <NextLink href={href} as={as} scroll={scroll}>
      <ZeitLink {...props} />
    </NextLink>
  );
}

export default Link;
