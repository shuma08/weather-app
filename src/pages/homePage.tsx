import React, { useEffect, useState } from 'react'
import { Carousel, Input, Spin,Modal } from 'antd'
import { Header } from 'antd/es/layout/layout'
import WeatherCard from '../components/weatherCard';
import { useDispatch, useSelector } from 'react-redux'
import { getWeather, refWeather } from '../redux/actions/weatherAction'
const { Search } = Input;

interface IWeather {
    name: string,
    sys: {
        country: string
    },
    weather: any,
    main: {
        feels_like: number,
        temp: number,
        temp_max: number,
        temp_min: number,
    }
    wind: {
        speed: number
    }
    hendleWeather: () => void,
    refreshWeather?: (data: object) => object,
    saved: boolean
}

const HomePage: React.FC = () => {
    const dispatch = useDispatch();
    const { data, isLoading, error } = useSelector<any, any>(state => state.weatherReduser);
    const [location, setLocation] = useState("")
    const [localStorageData, setLocalStorageData] = useState(JSON.parse(localStorage.getItem("weatherData") || '[]'))


    const showErrorModal = () => {
        if (error === null) {
          return
        }
        Modal.error({
          title: 'Error',
          content: error.response.data.message,
          centered: true
        });
      };
    
      useEffect(() => {
        error !== null && showErrorModal()
      }, [error])

    const onSearch = (value: string,) => {
        setLocation(value)
        dispatch<any>(getWeather(value, "metric"))
    };
    const handleWeather = (weatherData: any) => {
        const storageData = JSON.parse(localStorage.getItem("weatherData") || '[]')
        if (!location) {
            const deletWeather = storageData.filter((el: any) => el.id !== weatherData.id)
            localStorage.setItem("weatherData", JSON.stringify(deletWeather))
            setLocalStorageData(deletWeather)

        } else {
            localStorage.setItem("weatherData", JSON.stringify([
                data,
                ...storageData as []
            ]))
            setLocalStorageData([data, ...storageData])
            setLocation("")
        }
    }
    const refreshWeather = async (weatherData: { name: string }) => {
        dispatch<any>(refWeather(weatherData.name, "metric"))
    }

    return (
        <>
            <Header className='header'>
                <div>
                    <Search placeholder="search city" onSearch={onSearch} />
                </div>
            </Header>
            <div className='carousel-container'>
                <div className='location-container'>
                    {location && (
                        <WeatherCard data={data} saved={!!location} handleWeather={handleWeather} />
                    )}
                </div>
                <Carousel
                    pauseOnDotsHover={true}
                    pauseOnHover={true}
                    draggable
                    autoplay
                    className='carousel'
                >
                    {isLoading && <Spin size="large" />}
                    {localStorageData && (
                        localStorageData.map((item: IWeather) => (
                            <WeatherCard data={item} key={item.name} refreshWeather={refreshWeather} handleWeather={handleWeather} />
                        ))
                    )}
                </Carousel>
            </div >
        </>
    )
}

export default HomePage

