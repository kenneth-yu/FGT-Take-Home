import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from '@remix-run/react'
import { json } from '@remix-run/node'
import { DetailsPage } from "~/pages/DetailsPage";
import data from "~/consts/dummyData.json"

export const meta: MetaFunction = () => {
  return [
    { title: "Fast Growing Trees" },
    { name: "description", content: "Fast Growing Trees Take Home!" },
  ];
};

export const loader: LoaderFunction = async({ params, request }) =>{
    const { id } = params
    const url = new URL(request.url)

    //normally you would do a fetch for the id in the url here
    const products = data.products
    const foundProduct = products.find(product => product?.id.toString() === id)
    if (!foundProduct) {
        throw new Response(null, {
          status: 404,
          statusText: "Not Found",
        });
      }
    return json(foundProduct)
}

export default () => {
    const data = useLoaderData()
    return <DetailsPage data={data} />
}