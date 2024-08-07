import React, { useState, useEffect } from "react";
import { data as worldData } from "./World";
import { data as usaData } from "./Usa";

export enum MapTypes {
  World,
  Usa,
}

export type MapProps = {
  onSelect: (regionCode: string) => void;
  selectableRegions: string[];
  type: MapTypes;
  id: string;
};

const hoverColor = "hsl(39, 94%, 50%)";
const mapColor = "white";
const selectableColor = "hsl(39, 94%, 68%)";
const strokeColor = "grey";

// TODO clean up + move maps to a separate library?

export const Map = ({ onSelect, selectableRegions, type, id }: MapProps) => {
  const data = type === MapTypes.World ? worldData : usaData;

  const isSelectable = (code: string) => {
    return selectableRegions.findIndex((region) => region === code) !== -1;
  };

  const mapStyle = {
    fill: mapColor,
    stroke: strokeColor,
    strokeWidth: "0.5",
  };

  const handleMouseEnter = (regionId: string, regionCode: string) => {
    const path = document.getElementById(regionId);
    if (path && isSelectable(regionCode)) {
      path.style.fill = hoverColor;
      path.style.cursor = "pointer";
    }
  };

  const handleMouseLeave = (regionId: string, regionCode: string) => {
    const path = document.getElementById(regionId);
    if (path && isSelectable(regionCode)) {
      path.style.fill = selectableColor;
    }
  };

  const handleClick = (regionCode: string) => {
    if (onSelect && isSelectable(regionCode)) {
      onSelect(regionCode);
    }
  };

  return (
    <>
      <div className="map" style={mapStyle}>
        <svg version="1.0" viewBox={data.dimesions}>
          {data.regions?.map((region, index) => {
            const regionId = `${id}-${region.code}`;
            const regionCode = region.code;
            return (
              <path
                key={index}
                style={{
                  fill: isSelectable(regionCode) ? selectableColor : mapColor,
                }}
                onClick={() => handleClick(regionCode)}
                onMouseEnter={() => handleMouseEnter(regionId, regionCode)}
                onMouseLeave={() => handleMouseLeave(regionId, regionCode)}
                id={regionId}
                d={region.coordinates}
              />
            );
          })}
        </svg>
      </div>
    </>
  );
};
