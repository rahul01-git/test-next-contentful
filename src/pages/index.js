import Image from "next/image";
import { Inter } from "next/font/google";
import * as contentful from "contentful";

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

const inter = Inter({ subsets: ["latin"] });

export default function Home(props) {
  console.log(props);
  return (
    <main
      className={`flex min-h-screen flex-col items-center p-24 ${inter.className}`}
    >
      {props.entries.map((item) => {
       return <div>
          <h1 className="text-5xl my-12">{item.title}</h1>
          <p className="text-2xl my-12">{item.description}</p>
          <a href="/" className="text-2xl">
            {item.url}
          </a>
        </div>;
      })}
    </main>
  );
}

export async function getStaticProps() {
  const result = await client.getEntries();

  if (result.items) {
    const entries = result.items.map((item) => {
      return {
        title: item.fields.title || "",
        description: item.fields.description || "",
        url: item.fields.url || "",
      };
    });

    return {
      props: {
        entries,
      },
    };
  } else {
    return { props: {} };
  }
}
