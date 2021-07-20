/* eslint-disable @next/next/no-img-element */
import { ImgHTMLAttributes } from "react";
import styled from "styled-components";

interface ItemProps extends ImgHTMLAttributes<HTMLImageElement> {
  icon: number;
}

export function Item({ icon }: ItemProps) {
  return icon === 0 ? (
    <div></div>
  ) : (
    <img
      src={`http://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${icon}.png`}
      alt={`Item ${icon}`}
      className={icon === 0 ? "empty" : ""}
    />
  );
}
