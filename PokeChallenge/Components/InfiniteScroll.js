import React, { useState } from "react";
import { Spinner } from "@zeit-ui/react";

import useIntersectionObserver from "../utils/useIntersectionObserver";

function InfiniteScroll({ children, canFetchMore, fetchMore, isLoading }) {
  const [element, setElement] = useState(null);
  useIntersectionObserver(fetchMore, element);
  return (
    <>
      {children}
      {canFetchMore ? (
        <div
          style={{
            display: "flex",
            padding: "2rem 0",
            justifyContent: "center",
          }}
          ref={setElement}
        >
          {isLoading && <Spinner />}
        </div>
      ) : (
        <div style={{ padding: "84px 0" }} />
      )}
    </>
  );
}

export default InfiniteScroll;
