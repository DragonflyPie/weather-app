import React from "react";
import { IoCloudyNight, IoRainy, IoRainyOutline } from "react-icons/io5";
import { WiDayCloudy, WiDaySunny, WiStars } from "react-icons/wi";
import { RiMistFill, RiThunderstormsFill } from "react-icons/ri";
import {
  BsClouds,
  BsCloudsFill,
  BsCloudSnow,
  BsCloudSnowFill,
} from "react-icons/bs";

interface WeatherIconType {
  iconName: string;
}

const WeatherIcon = ({ iconName }: WeatherIconType) => {
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "clear-day":
        return <WiDaySunny />;
      case "clear-night":
        return <WiStars />;
      case "clouds-few-day":
        return <WiDayCloudy />;
      case "clouds-few-night":
        return <IoCloudyNight />;
      case "clouds-day":
        return <BsClouds />;
      case "clouds-night":
        return <BsCloudsFill />;
      case "rain-day":
        return <IoRainyOutline />;
      case "rain-night":
        return <IoRainy />;
      case "snow-day":
        return <BsCloudSnow />;
      case "snow-night":
        return <BsCloudSnowFill />;
      case "thunder-day":
      case "thunder-night":
        return <RiThunderstormsFill />;
      case "mist-day":
      case "mist-night":
        return <RiMistFill />;
      default:
        return <div className="no-icon"></div>;
    }
  };
  return renderIcon(iconName);
};

export default WeatherIcon;
