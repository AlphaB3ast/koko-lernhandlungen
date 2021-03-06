import { Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { graphql, useStaticQuery } from "gatsby";
import { ImageDataLike } from "gatsby-plugin-image";
import React, { useState } from "react";
import { DefaultAccordion } from "../components/pages/DefaultAccordion";
import { WrappingPaper } from "../components/pages/WrappingPaper";
import { PageWrapper } from "../utils/pageWrapper/PageWrapper";

interface Nodes {
  node:
    | ImageDataLike & {
        id: string;
        name: string;
        childImageSharp: {
          fluid: {
            src: string;
          };
          fixed: {
            src: string;
          };
        };
      };
}

interface Props {
  src: string;
  img: string;
  alt: string;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  bgcolor: "background.paper",
  display: "flex",
};

export const ImageModal: React.FC<Props> = ({ src, img, alt }) => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen(!open);

  return (
    <>
      <img
        onClick={toggleOpen}
        src={img}
        alt={alt}
        style={{ maxWidth: "100%", margin: "auto" }}
      />
      <Modal open={open} onClose={toggleOpen}>
        <Box sx={style}>
          <img
            src={src}
            alt={alt}
            style={{ margin: "auto", maxWidth: "100%" }}
            onClick={toggleOpen}
          />
        </Box>
      </Modal>
    </>
  );
};

export const ImageAccordions: React.FC = () => {
  const data: any = useStaticQuery(graphql`
    query {
      images: allFile(filter: { name: { regex: "/Pose/" } }) {
        edges {
          node {
            id
            name
            childImageSharp {
              fixed(toFormat: WEBP, width: 500, height: 500) {
                src
              }
              fluid {
                src
              }
            }
          }
        }
      }
    }
  `);
  const [...images]: Nodes[] = data.images.edges;
  const sortedImages = images.sort((a, b) =>
    a.node.name.localeCompare(b.node.name)
  );
  return (
    <>
      {sortedImages.map((image, index) => (
        <DefaultAccordion title={image.node.name} key={image.node.id}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <ImageModal
              src={image.node.childImageSharp.fluid.src}
              img={image.node.childImageSharp.fixed.src}
              alt={image.node.name}
            />
          </div>
        </DefaultAccordion>
      ))}
    </>
  );
};

const Sprechen: React.FC = () => {
  const description =
    "Das Sprechen behandelt mehrere M??glichkeiten, sich mit dem Inhalt auseinanderzusetzen. Eine M??glichkeit ist, den Sachverhalt anderen zu erkl??ren, und sich dadurch mit der Materia vertieft zu befassen. Je ??fter man erkl??rt, desto leichter f??llt es, den Inhalt zu verstehen.";

  return (
    <PageWrapper title='Sprechen' shortDescription={description}>
      <WrappingPaper dark>
        <Typography variant='h6'>
          In dieser Aufgabe geht es darum, Informationen Sprechend zu
          wiederholen.
        </Typography>
        <br />
        <Typography>
          Hierf??r kannst du entweder mit dir selbst, gegen Gegenst??nde,
          Haustiere oder Menschen sprechen. Im Unterricht empfehlen wir, dir
          einen Partner zu suchen, und gemeinsam die ??bungen durchzuf??hren. Die
          ??bung kann zu zweit oder mit mehreren Personen durchgef??hrt werden.
          Der Sprecher hat die Aufgabe, die Pose dem/n Zuh??rer/n so zu erkl??ren,
          dass diese/r sie korrekt nachzeichnen kann.
          <br />
          <br /> Klappe die Pose auf und erkl??re Sie deinen Kollegen.
        </Typography>
        <ImageAccordions />
      </WrappingPaper>
    </PageWrapper>
  );
};

export default Sprechen;
