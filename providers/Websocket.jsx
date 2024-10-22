import React, {createContext, useCallback, useEffect, useState} from 'react';
import useWebSocket from 'react-native-use-websocket';
import useSound from 'react-native-use-sound';
import {urlSocket} from '../axios/Axios.js';
// import alarmSound from '../assets/sounds/alarm.mp3';
export const WS_Context = createContext(null);

const Websocket = props => {
  const [play, _pause, stop, data] = useSound(
    'http://192.168.137.113:4000/static/assets/sounds/alarm.mp3',
    {numberOfLoops: -1, timeRate: 500, volume: 1},
  );
  const [stateAlarm, setStateAlarm] = useState([]);

  const {sendJsonMessage, lastJsonMessage} = useWebSocket(urlSocket, {
    onOpen: () => {
      //Callback que se ejecuta si la conexion es exitosa
      console.log(
        'Conexión con sockets establecida en modulo administrativo de botones de panico',
      );
    },
    onError: err => {
      //Callback que se ejecuta si la conexion es erronea
      console.log(`Conexion perdida ${err}`);
    },
    share: true,
    filter: e => {
      //Callback que solo filtrara los sockets con los tipos de eventos que necesitemos, en este caso ("panicBtnOn", "getPanicInfo")
      const type = JSON.parse(e.data).type;
      return (
        type === 'panicBtnOn' ||
        type === 'getPanicInfo' ||
        type === 'panicBtnOff'
      );
    },
    retryOnError: true,
    shouldReconnect: () => true,
  });

  const getPanicInfo = useCallback(() => {
    //funcion para obtener datos de la BD
    sendJsonMessage({
      type: 'getPanicInfo',
    });
  }, [sendJsonMessage]);

  useEffect(() => {
    //Actualiza el estado conforme cuando haya cambios en la base de datos inmediatamente cambiara el estado.
    if (
      lastJsonMessage &&
      lastJsonMessage.success &&
      lastJsonMessage.type === 'getPanicInfo'
    ) {
      setStateAlarm(lastJsonMessage.response);
    }

    //Cuando el socket detecte un evento de tipo "panicBtnOn" pedira informes al servidor de que islas estan afectadas.
    if (
      lastJsonMessage &&
      (lastJsonMessage.type === 'panicBtnOn' ||
        lastJsonMessage.type === 'panicBtnOff')
    ) {
      getPanicInfo();
    }
  }, [lastJsonMessage, getPanicInfo]);

  //UseEffect para obtener el estado actual de las islas, solo cargara una vez.
  useEffect(() => getPanicInfo(), [getPanicInfo]);

  useEffect(() => {
    if (stateAlarm.length > 0) {
      if (!data.isPlaying) {
        play();
      }
    } else {
      if (data.isPlaying) {
        stop();
      }
    }
  }, [stateAlarm, data, play, stop]);

  return (
    <WS_Context.Provider
      value={{
        sendJsonMessage,
        lastJsonMessage,
        play,
        stop,
        data,
        stateAlarm,
        setStateAlarm,
      }}>
      {props.children}
    </WS_Context.Provider>
  );
};

export default Websocket;
