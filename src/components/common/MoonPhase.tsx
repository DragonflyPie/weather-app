import React, { ReactElement } from "react";
import {
  WiMoonFirstQuarter,
  WiMoonFull,
  WiMoonNew,
  WiMoonWaningCrescent1,
  WiMoonWaningCrescent2,
  WiMoonWaningCrescent3,
  WiMoonWaningCrescent4,
  WiMoonWaningCrescent5,
  WiMoonWaningGibbous1,
  WiMoonWaningGibbous2,
  WiMoonWaningGibbous3,
  WiMoonWaningGibbous4,
  WiMoonWaningGibbous5,
  WiMoonWaningGibbous6,
  WiMoonWaxingCrescent1,
  WiMoonWaxingCrescent2,
  WiMoonWaxingCrescent3,
  WiMoonWaxingCrescent4,
  WiMoonWaxingCrescent5,
  WiMoonWaxingGibbous1,
  WiMoonWaxingGibbous2,
  WiMoonWaxingGibbous3,
  WiMoonWaxingGibbous4,
  WiMoonWaxingGibbous5,
  WiMoonWaxingGibbous6,
} from "react-icons/wi";

interface MoonPhaseProps {
  phase: number;
}

const MoonPhase = ({ phase }: MoonPhaseProps) => {
  const percentPerPhase = 100 / 16;
  const getDescription = (phase: number) => {
    return phase < 5
      ? "Новая луна"
      : phase <= 48
      ? "Растущая луна"
      : phase <= 52
      ? "Полнолуние"
      : "Убывающая луна";
  };
  const renderIcon = (phase: number): JSX.Element => {
    if (phase < percentPerPhase * 1) return <WiMoonNew />;
    if (phase < percentPerPhase * 2) return <WiMoonWaxingCrescent2 />;
    if (phase < percentPerPhase * 3) return <WiMoonWaxingCrescent4 />;
    if (phase < percentPerPhase * 4) return <WiMoonWaxingCrescent5 />;
    if (phase < percentPerPhase * 5) return <WiMoonFirstQuarter />;
    if (phase < percentPerPhase * 6) return <WiMoonWaxingGibbous1 />;
    if (phase < percentPerPhase * 7) return <WiMoonWaxingGibbous3 />;
    if (phase < percentPerPhase * 8) return <WiMoonWaxingGibbous6 />;
    if (phase < percentPerPhase * 9) return <WiMoonFull />;
    if (phase < percentPerPhase * 10) return <WiMoonWaningGibbous1 />;
    if (phase < percentPerPhase * 11) return <WiMoonWaningGibbous3 />;
    if (phase < percentPerPhase * 12) return <WiMoonWaningGibbous6 />;
    if (phase < percentPerPhase * 13) return <WiMoonFirstQuarter />;
    if (phase < percentPerPhase * 14) return <WiMoonWaningCrescent2 />;
    if (phase < percentPerPhase * 15) return <WiMoonWaningCrescent4 />;
    return <WiMoonWaningCrescent5 />;
  };
  return (
    <div className="weather__column">
      {renderIcon(phase)}
      <div>{getDescription(phase)}</div>
    </div>
  );
};

export default MoonPhase;
