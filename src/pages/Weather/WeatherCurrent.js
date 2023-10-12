import i18n from "../../i18n/i18n";

const WeatherCurrent = ({ data }) => {
  return (
    <div
      className="w-80 rounded-lg bg-active"
      style={{
        boxShadow: "10px -2px 20px 2px rgb(0 0 0/30%)",
        margin: "20px auto 0 auto",
        padding: "0 20px 20px 20px",
      }}
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="font-semibold text-lg m-0 leading-none tracking-wider">
            {data.city}
          </p>
          <p className="font-light text-sm leading-none m-0">
            {data.weather[0].description}
          </p>
        </div>
        <img
          alt="weather"
          className="w-28"
          src={`assets/${data.weather[0].icon}.png`}
        />
      </div>
      <div className="flex justify-between items-center">
        <p className="font-semibold text-4xl w-auto tracking-tighter my-2">
          {Math.round(data.main.temp)}°C
        </p>
        <div className="w-full pl-5">
          <div className="flex justify-between">
            <span className="font-semibold">
              {i18n.t("current_weather:details")}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-left font-normal text-xs">
              {i18n.t("current_weather:details")}
            </span>
            <span className="text-right font-semibold text-xs">
              {Math.round(data.main.feels_like)}°C
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-left font-normal text-xs">
              {i18n.t("current_weather:wind")}
            </span>
            <span className="text-right font-semibold text-xs">
              {data.wind.speed} m/s
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-left font-normal text-xs">
              {i18n.t("current_weather:humidity")}
            </span>
            <span className="text-right font-semibold text-xs">
              {data.main.humidity}%
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-left font-normal text-xs">
              {i18n.t("current_weather:pressure")}
            </span>
            <span className="text-right font-semibold text-xs">
              {data.main.pressure}hPa
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCurrent;
