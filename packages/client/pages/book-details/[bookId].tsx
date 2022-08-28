import type { NextPage } from "next";
import Head from "next/head";
import Breadcrumbs from "../../components/common/Breadcrumbs";

const BookDetails: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Book details</title>
      </Head>
      <Breadcrumbs
        list={[{ title: "Home", link: "/" }, { title: "Book title" }]}
      />
    </div>
  );
};

export default BookDetails;
