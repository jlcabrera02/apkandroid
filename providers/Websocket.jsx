import React, {createContext, useCallback, useEffect, useState} from 'react';
import useWebSocket from 'react-native-use-websocket';
import useSound from 'react-native-use-sound';
import {urlMain, urlSocket} from '../axios/Axios.js';
import BackgroundTimer from 'react-native-background-timer';
export const WS_Context = createContext(null);

const Websocket = props => {
  const [play, _pause, stop, data] = useSound(
    `${urlMain}/static/assets/sounds/alarm.mp3`,
    {numberOfLoops: -1, timeRate: 500, volume: 1},
  );
  const [stateAlarm, setStateAlarm] = useState([]);

  const {sendJsonMessage, lastJsonMessage, getWebSocket} = useWebSocket(
    urlSocket,
    {
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
    },
  );

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
  useEffect(() => getPanicInfo, [getPanicInfo]);

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

  //apagar alarma
  const apagarAlarma = useCallback(
    idIsla => {
      sendJsonMessage({
        type: 'panicBtnOff',
        idIsla,
      });
    },
    [sendJsonMessage],
  );

  // Mantener la conexión WebSocket en segundo plano
  useEffect(() => {
    const intervalId = BackgroundTimer.setInterval(() => {
      const socket = getWebSocket();

      // Verificar si la conexión está cerrada y reintentar si es necesario
      if (socket && socket.readyState !== WebSocket.OPEN) {
        console.log('Reintentando conexión WebSocket');
        getWebSocket(); // Forzar reconexión
      }
    }, 15000); // Revisa cada 15 segundos

    // Limpiar el temporizador al desmontar el componente
    return () => {
      BackgroundTimer.clearInterval(intervalId);
    };
  }, [getWebSocket]);

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
        apagarAlarma,
      }}>
      {props.children}
    </WS_Context.Provider>
  );
};

export default Websocket;
