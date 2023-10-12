import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import i18n from "../../../i18n/i18n";

const WEEK_DAYS = [
  `${i18n.t("days:monday")}`,
  `${i18n.t("days:tuesday")}`,
  `${i18n.t("days:wednesday")}`,
  `${i18n.t("days:thursday")}`,
  `${i18n.t("days:friday")}`,
  `${i18n.t("days:saturday")}`,
  `${i18n.t("days:sunday")}`,
];

const WeatherForecast = ({ data }) => {
  const weekDay = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(weekDay, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, weekDay)
  );

  return (
    <>
      <label className="text-2xl font-semibold">
        {i18n.t("forecast_weather:daily")}
      </label>
      <Accordion allowZeroExpanded>
        {data.list.splice(0, 7).map((item, index) => (
          <AccordionItem key={index}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="bg-gray-300 rounded-lg h-10 my-2 flex items-center cursor-pointer text-base p-2">
                  <img
                    alt="weather"
                    className="w-10 h-10"
                    src={`assets/${item.weather[0].icon}.png`}
                  ></img>
                  <label className="cursor-default text-gray-800 flex-1 font-semibold ml-4">
                    {forecastDays[index]}
                  </label>
                  <label className="cursor-default flex-1 mr-4 text-right text-gray-800">
                    {item.weather[0].description}
                  </label>
                  <label className="text-gray-500">
                    {Math.round(item.main.temp_min)}°C /{" "}
                    {Math.round(item.main.temp_max)}°C
                  </label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="grid gap-x-4 md:gap-x-6 grid-cols-2 p-2 md:p-4">
                <div className="flex items-center h-8 justify-between">
                  <label className="text-gray-500">
                    {i18n.t("forecast_weather:pressure")}
                  </label>
                  <label className="text-gray-800">
                    {item.main.pressure} hPa
                  </label>
                </div>
                <div className="flex items-center h-8 justify-between">
                  <label className="text-gray-500">
                    {i18n.t("forecast_weather:humidity")}
                  </label>
                  <label className="text-gray-800">{item.main.humidity}</label>
                </div>
                <div className="flex items-center h-8 justify-between">
                  <label className="text-gray-500">
                    {i18n.t("forecast_weather:clouds")}
                  </label>
                  <label className="text-gray-800">{item.clouds.all}</label>
                </div>
                <div className="flex items-center h-8 justify-between">
                  <label className="text-gray-500">
                    {i18n.t("forecast_weather:wind_speed")}
                  </label>
                  <label className="text-gray-800">{item.wind.speed} m/s</label>
                </div>
                <div className="flex items-center h-8 justify-between">
                  <label className="text-gray-500">
                    {i18n.t("forecast_weather:sea_level")}
                  </label>
                  <label className="text-gray-800">
                    {item.main.sea_level}m
                  </label>
                </div>
                <div className="flex items-center h-8 justify-between">
                  <label className="text-gray-500">
                    {i18n.t("forecast_weather:feels_like")}
                  </label>
                  <label className="text-gray-800">
                    {Math.round(item.main.feels_like)}
                  </label>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
        <AccordionItem></AccordionItem>
      </Accordion>
    </>
  );
};

export default WeatherForecast;
