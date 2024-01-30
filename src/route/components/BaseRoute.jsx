import { Suspense } from "react";
import Layout from "../../layout/components/Layout";

export default function BaseRoute() {
  return (
    <Suspense>
      <Layout/>
    </Suspense>
  )
}