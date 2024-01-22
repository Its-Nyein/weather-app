import { useEffect, useState } from "react";
import "./App.css";
import Highlights from "./components/Highlights";
import Temperature from "./components/Temperature";

function App() {
  const [city, setCity] = useState("London");
  const [weaterData, setWeatherData] = useState(null);

  const apiURL = `https://api.weatherapi.com/v1/current.json?key=f1445bcb23cb49b08c9104751242201&q=${city}&aqi=no`;

  useEffect(() => {
    fetch(apiURL)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setWeatherData(data);
      })
      .catch((e) => console.log(e.message));
  }, [city]);

  return (
    <div className="bg-[#1F213A] h-screen flex justify-center align-top">
      <div className="w-1/5 h-1/3 mt-40">
        {weaterData && (
          <Temperature
            setCity={setCity}
            stats={{
              temp: weaterData.current.temp_c,
              condition: weaterData.current.condition.text,
              isDay: weaterData.current.is_day,
              location: weaterData.location.name,
              time: weaterData.location.localtime,
            }}
          />
        )}
      </div>
      <div className="w-1/3 h-1/3 mt-40 p-10 grid grid-cols-2 gap-6">
        <h2 className="text-slate-200 text-2xl col-span-2">
          Today's Highlights
        </h2>
        {weaterData && (
          <>
            <Highlights
              stats={{
                title: "Wind Status",
                value: weaterData.current.wind_mph,
                unit: "mph",
                direction: weaterData.current.wind_dir,
              }}
            />
            <Highlights
              stats={{
                title: "Humidity",
                value: weaterData.current.humidity,
                unit: "%",
              }}
            />
            <Highlights
              stats={{
                title: "Visibility",
                value: weaterData.current.vis_miles,
                unit: "miles",
              }}
            />
            <Highlights
              stats={{
                title: "Air Pressure",
                value: weaterData.current.pressure_mb,
                unit: "mb",
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
