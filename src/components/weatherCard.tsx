import React from 'react'
import { Card, Button, Collapse, Statistic } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined, SwapRightOutlined, RedoOutlined } from '@ant-design/icons';

const { Panel } = Collapse;
interface IWeatherData {
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
}

interface IWeather {
    data: IWeatherData,
    handleWeather: (data: IWeatherData) => void,
    refreshWeather?: (data: IWeatherData) => void,
    saved?: boolean
}

const WeatherCard: React.FC<IWeather> = ({ data, handleWeather, refreshWeather, saved }) => {
    const refresh = () => refreshWeather ? refreshWeather(data) : console.error("refreshWeather undefind");

    return (
        <div className='card-container'>
            <Card title={`${data.name}  ${data?.sys?.country}`} bordered={false} >
                <Button className='save-btn' onClick={()=>handleWeather(data)}>{saved ? "Save" : "Delete"}</Button>
                {!saved  && <Button className='refresh-btn' onClick={refresh} icon={<RedoOutlined />} />}
                <div className='img-temp-container'>
                    <img src={`https://openweathermap.org/img/wn/${data?.weather?.[0].icon}@2x.png`} alt='ícon' />
                    <div className='temp-container'>
                        <span className='font-style'>Temp. <span className='degrees'>{data?.main?.temp.toFixed()}</span></span>
                        <span className='font-style'>Feels like <span className='degrees'>{data?.main?.feels_like.toFixed()}</span></span>
                    </div>
                </div>
                <p className='font-style'>{data?.weather?.[0].main}</p>
                <Collapse
                    bordered={false}
                >
                    <Panel key={1} header={'Info'}>
                        <div className='min-max-container'>
                            <Card className='min-max-card'>
                                <Statistic
                                    title="Max Temp"
                                    value={data?.main?.temp_max.toFixed()}
                                    valueStyle={{ color: '#3f8600' }}
                                    prefix={<ArrowUpOutlined />}
                                />
                            </Card>
                            <Card className='min-max-card'>
                                <Statistic
                                    title="Min Temp"
                                    value={data?.main?.temp_min.toFixed()}
                                    valueStyle={{ color: '#cf1322' }}
                                    prefix={<ArrowDownOutlined />}
                                />
                            </Card>
                            <Card className='min-max-card'>
                                <Statistic
                                    title="Wind Speed"
                                    value={data?.wind?.speed}
                                    valueStyle={{ color: '#62475e' }}
                                    prefix={<SwapRightOutlined />}
                                    suffix="km"
                                />
                            </Card>
                        </div>
                    </Panel>
                </Collapse>
            </Card>
        </div>
    )
}

export default WeatherCard