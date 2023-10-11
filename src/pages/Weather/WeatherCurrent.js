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
            Ankara
          </p>
          <p className="font-light text-sm leading-none m-0">Sunny</p>
        </div>
        <img alt="weather" className="w-28" src="assets/01d.png" />
      </div>
      <div className="flex justify-between items-center">
        <p className="font-semibold text-4xl w-auto tracking-tighter my-2">
          19°C
        </p>
        <div className="w-full pl-5">
          <div className="flex justify-between">
            <span className="parameter-label">details</span>
          </div>
          <div className="flex justify-between">
            <span className="text-left font-normal text-xs">feels like</span>
            <span className="text-right font-semibold text-xs">19°C</span>
          </div>
          <div className="flex justify-between">
            <span className="text-left font-normal text-xs">wind</span>
            <span className="text-right font-semibold text-xs">2m/s</span>
          </div>
          <div className="flex justify-between">
            <span className="text-left font-normal text-xs">humidity</span>
            <span className="text-right font-semibold text-xs">15 %</span>
          </div>
          <div className="flex justify-between">
            <span className="text-left font-normal text-xs">pressure</span>
            <span className="text-right font-semibold text-xs">15 hPa</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCurrent;
