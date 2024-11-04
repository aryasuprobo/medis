import { Provider } from "@/components/ui/provider"
import { AppProps } from "next/app"

export default function App({ Component, pageProps }) {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  )
}