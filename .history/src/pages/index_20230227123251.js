import Head from "next/head";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const apiKey = "51643357615f0c8f53a8e4a56785152f";
  const location = "Vancouver";
  const units = "metric";
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=${units}&appid=${apiKey}`;

  const [weather, setWeather] = useState();
  const grabbedWeather = useRef(false);

  const getWeather = async () => {
    const response = await axios.get(url);
    // setWeather(response.data);
    console.log(response.data);
    console.log(response.data.list);
    const arrayOfDays = [];

    let weatherData = response.data.list.map((weather, index) => {
      console.log(parseInt(weather.dt_txt.substr(8, 2), 10));
      let num = parseInt(weather.dt_txt.substr(8, 2), 10);

      if (num !== arrayOfDays.find((element) => element === num)) {
        arrayOfDays.push(num);
        console.log("here");
        console.log(response.data.list[index]);

        let month = "";
        let icon = "";

        if (weather.dt_txt.substr(5, 2) == 1) {
          month = "January";
        } else if (weather.dt_txt.substr(5, 2) == 2) {
          month = "February";
        } else if (weather.dt_txt.substr(5, 2) == 3) {
          month = "March";
        } else if (weather.dt_txt.substr(5, 2) == 4) {
          month = "April";
        } else if (weather.dt_txt.substr(5, 2) == 5) {
          month = "May";
        } else if (weather.dt_txt.substr(5, 2) == 6) {
          month = "June";
        } else if (weather.dt_txt.substr(5, 2) == 7) {
          month = "July";
        } else if (weather.dt_txt.substr(5, 2) == 8) {
          month = "August";
        } else if (weather.dt_txt.substr(5, 2) == 9) {
          month = "September";
        } else if (weather.dt_txt.substr(5, 2) == 10) {
          month = "October";
        } else if (weather.dt_txt.substr(5, 2) == 11) {
          month = "November";
        } else if (weather.dt_txt.substr(5, 2) == 12) {
          month = "December";
        }

        if (weather.weather[0].main == "Clouds") {
          icon = "/new-icons/clouds.svg";
        } else if (weather.weather[0].main == "Clear") {
          icon = "/new-icons/clear.svg";
        } else if (weather.weather[0].main == "Atmosphere") {
          icon = "/new-icons/mist.svg";
        } else if (weather.weather[0].main == "Rain") {
          icon = "/new-icons/rain.svg";
        } else if (weather.weather[0].main == "Drizzle") {
          icon = "/new-icons/drizzle.svg";
        } else if (weather.weather[0].main == "Snow") {
          icon = "/new-icons/snow.svg";
        } else if (weather.weather[0].main == "Thunderstorm") {
          icon = "/new-icons/thunderstorm.svg";
        }

        let now = new Date(weather.dt_txt);
        let days = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        let day = days[now.getDay()];

        return (
          <div
            key={index}
            className="flex flex-col items-center bg-blue-200 px-[20px] py-[30px] rounded-lg shadow-md transition-all duration-300 flex-wrap hover:translate-y-[-3px]"
          >
            <div>
              <Image src={icon} alt={icon} width={100} height={100} priority />
            </div>

            <div>
              <div>
                <p className="text-lg font-semibold">{day}</p>
              </div>

             
              <div>
                <p>
                  {month} {weather.dt_txt.substr(8, 2)},{" "}
                  {weather.dt_txt.substr(0, 4)}{" "}
                </p>
              </div>
            </div>
            <div>{Math.round(weather.main.temp.toFixed(1)) + "°C"}</div>
            <div>{weather.weather[0].main}</div>
          </div>
        );
      }

     
    });
    console.log(arrayOfDays);
    setWeather(weatherData);
  };

  useEffect(() => {
   
    getWeather();
    return () => {
      grabbedWeather.current = true;
    };
  }, []);

  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  return (
    <>
      <Head>
        <title>Weather Rico</title>
        <meta name="description" content="By- Aly Ramzan" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Logo.png" />
      </Head>
      <main className="flex flex-col justify-between h-screen w-full">
        {/* <h1>Home</h1> */}
        <div className="flex justify-around mt-6">
          <div className="flex justify-center">
            <Image src="/logo.png" width={300} height={300} />
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <h1 className="text-3xl">Vancouver, B.C. Weather</h1>
            <p>Last updated: {date}</p>
          </div>
        </div>
        <div className="flex gap-8 justify-center text-center">{weather}</div>
        <div className="flex justify-between w-full bg-[#128CBA] py-4 items-center gap-2 px-14">
          <p className="text-center text-lg text-[#fff]">By - Aly Ramzan</p>
          <Link href="https://github.com/Ishan-sa/celsiusly" target="_blank">
            <Image
              src="/github.svg"
              width={25}
              height={25}
              alt="github"
              className="filtered-gray"
            />
          </Link>
        </div>
      </main>
    </>
  );
}
