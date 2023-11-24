import React from "react";

import usePrivate from "@/hooks/usePrivate";
import { Loader, LoaderWrap } from "@/components/Loader/Loader";
import useIsClient from "@/hooks/useIsClient";

const Protected = () => {
  const auth = usePrivate();
  const isClient = useIsClient();

  if (!isClient || !auth) {
    return (
      <LoaderWrap>
        <Loader />
      </LoaderWrap>
    );
  }

  return <div>PROTECTED</div>;
};

export default Protected;
