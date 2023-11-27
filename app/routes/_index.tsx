import type { MetaFunction } from "@remix-run/node";
import { ListingsPage } from "~/pages/ListingsPage";

export const meta: MetaFunction = () => {
  return [
    { title: "Fast Growing Trees" },
    { name: "description", content: "Fast Growing Trees Take Home!" },
  ];
};

export default function Index() {
  
  return (
    <div style={{ fontFamily: "Inter, sans-serif", lineHeight: "1.8" }}>
      <ListingsPage/>
    </div>
  );
}
