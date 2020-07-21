import React from "react";
import I18n from "../i18n";
import "../styles/styles.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <I18n lngDict={pageProps.lngDict} locale={pageProps.lng}>
      <Component {...pageProps} />
    </I18n>
  );
}
