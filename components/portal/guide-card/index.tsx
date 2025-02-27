import { ModuleType } from "@3rdweb/sdk";
import {
  AspectRatio,
  Box,
  Heading,
  LinkBox,
  LinkOverlay,
  Stack,
} from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import { NextLink } from "components/shared/NextLink";
import React, { useMemo } from "react";
import { FeatureIconMap } from "utils/feature-icons";
import { Guide } from "utils/portalTypes";
import { GrayTag } from "../tag";

interface PortalGuideCardProps {
  guide: Guide;
  href: string;
  blog?: boolean | undefined;
}
export const TagToModuleTypeMap = {
  "nft-collection": ModuleType.NFT,
  edition: ModuleType.COLLECTION,
  "nft-drop": ModuleType.DROP,
  "edition-drop": ModuleType.BUNDLE_DROP,
  token: ModuleType.CURRENCY,
  marketplace: ModuleType.MARKET,
  pack: ModuleType.PACK,
  vote: ModuleType.VOTE,
  split: ModuleType.SPLITS,
};

export const PortalGuideCard: React.FC<PortalGuideCardProps> = ({
  guide,
  href,
  blog,
}) => {
  const { image, title, tags } = guide;
  const specialTag: keyof typeof TagToModuleTypeMap | undefined =
    useMemo(() => {
      const specialTagArray = Object.keys(TagToModuleTypeMap);
      return (
        (specialTagArray.filter((x) =>
          tags.includes(x),
        )[0] as keyof typeof TagToModuleTypeMap) || undefined
      );
    }, [tags]);
  return (
    <LinkBox as={Stack} spacing={4}>
      <AspectRatio ratio={1200 / 630} w="100%">
        <Box borderRadius="lg" overflow="hidden">
          <ChakraNextImage
            alt={`${title} thumbnail`}
            borderTopLeftRadius="lg"
            borderBottomRightRadius="lg"
            src={image}
            w="100%"
            h="100%"
            objectFit="cover"
            objectPosition="center"
            width="360"
            height="189"
          />
        </Box>
      </AspectRatio>
      <Stack>
        <Stack direction="row" align="center">
          {specialTag ? (
            <>
              <ChakraNextImage
                boxSize={6}
                alt={`${specialTag}icon`}
                src={FeatureIconMap[TagToModuleTypeMap[specialTag]]}
              />
              <Heading opacity={0.7} size="label.md" textTransform="uppercase">
                {specialTag.replace(/-/g, " ")}
              </Heading>
            </>
          ) : (
            <>
              <ChakraNextImage
                boxSize={6}
                width={6}
                height={6}
                alt="generalicon"
                src="/assets/tw-icons/general.png"
              />
              <Heading opacity={0.7} size="label.md" textTransform="uppercase">
                General
              </Heading>
            </>
          )}
        </Stack>
        <LinkOverlay as={NextLink} href={href}>
          <Heading size="title.sm" fontWeight={600} noOfLines={2}>
            {title}
          </Heading>
        </LinkOverlay>
      </Stack>
      <Stack direction="row">
        {tags?.slice(0, 3).map((tag) => (
          <GrayTag key={tag} tag={tag} blog={blog} />
        ))}
      </Stack>
    </LinkBox>
  );
};
