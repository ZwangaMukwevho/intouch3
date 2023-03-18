import config from "@config/config.json";
import theme from "@config/theme.json";
import Head from "next/head";
import { useEffect, useState } from "react";
import TagManager from "react-gtm-module";
import "styles/style.scss";
import { useRouter } from "next/router";
import { AuthUserProvider } from "../logic/context/authUserContext";
import LoadingScreen from "../components/home/loadingScreen";

const App = ({ Component, pageProps }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  // default theme setup

  // import google font css
  const pf = theme.fonts.font_family.primary;
  const sf = theme.fonts.font_family.secondary;
  const [fontcss, setFontcss] = useState();
  useEffect(() => {
    fetch(
      `https://fonts.googleapis.com/css2?family=${pf}${
        sf ? "&family=" + sf : ""
      }&display=swap`
    ).then((res) => res.text().then((css) => setFontcss(css)));
  }, [pf, sf]);

  // google tag manager (gtm)
  const tagManagerArgs = {
    gtmId: config.params.tag_manager_id,
  };
  useEffect(() => {
    setTimeout(() => {
      process.env.NODE_ENV === "production" &&
        config.params.tag_manager_id &&
        TagManager.initialize(tagManagerArgs);
    }, 5000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      setLoading(true);
      // console.log(
      //   `App is changing to ${url} ${
      //     shallow ? "with" : "without"
      //   } shallow routing`
      // );
    };

    const handleRouteComplete = (url, { shallow }) => {
      // console.log("you have finished going to the new page");
      setLoading(false);
    };

    router.events.on("routeChangeStart", handleRouteChange);
    router.events.on("routeChangeComplete", handleRouteComplete);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);

  return (
    <>
      {!loading ? (
        <>
          <Head>
            {/* google font css */}
            <link
              rel="preconnect"
              href="https://fonts.gstatic.com"
              crossOrigin="true"
            />
            <style
              dangerouslySetInnerHTML={{
                __html: `${fontcss}`,
              }}
            />
            {/* responsive meta */}
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, maximum-scale=5"
            />
          </Head>
          <AuthUserProvider>
            <Component {...pageProps} />
          </AuthUserProvider>
        </>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
};

export default App;
