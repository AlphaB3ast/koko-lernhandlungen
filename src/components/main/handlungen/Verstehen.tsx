import { graphql, useStaticQuery } from "gatsby";
import React, { useEffect } from "react";
import { CardTemplate } from "../../../utils/card";

export const Verstehen: React.FC = () => {
  const text: string =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit ipsum unde temporibus autem! Magnam cum deserunt cumque nostrum cupiditate voluptas odit sint aliquam vitae adipisci at quasi deleniti, est illo.";

  const data: any = useStaticQuery(graphql`
    query {
      file(name: { eq: "verstehen" }) {
        name
        childImageSharp {
          fluid(maxWidth: 345) {
            src
          }
        }
      }
    }
  `);
  useEffect(() => {
    console.log(data);
  }, []);

  return (
    <CardTemplate
      title='Verstehen'
      text={text}
      image={data.file.childImageSharp.fluid.src}
      alt='verstehen'
    />
  );
};