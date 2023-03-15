import React from "react";
import { BlockRendererProvider } from "@webdeveducation/wp-block-tools";
import { BlockRendererComponents } from "../config/BlockRendererComponents";
import { Link, graphql } from "gatsby";
import { Layout } from "../components/Layout";

const Page = (props) => {
    return (
        <Layout>
            <BlockRendererProvider 
                allBlocks={props.pageContext.blocks}
                renderComponent={BlockRendererComponents} 
                siteDomain={process.env.GATSBY_WP_URL}
                customInternalLinkComponent={({children, internalHref, className}, index) => {
                    return <Link key={index} to={internalHref} className={className}>{children}</Link>;
                }}
                />
        </Layout>
    );
};

export const query = graphql`
query PageQuery($databaseId: Int!) {
    wpPage(databaseId: {eq: $databaseId} ) {
        seo {
            metaDesc
            title
        }
    }
    wpCar(databaseId: {eq: $databaseId} ) {
        seo {
            metaDesc
            title
        }
    }
}`;

export const Head = ({data}) => {
    const page = data.wpPage || data.wpCar;
    return (
        <>
        <title>
            {page.seo?.title || ""}
        </title>
        <meta name="description" content={page.seo.metaDesc || ""}></meta>
        </>
    )
}

export default Page;