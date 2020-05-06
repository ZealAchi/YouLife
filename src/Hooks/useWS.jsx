import { useEffect, useState } from 'react';
import { useMemo } from 'react';
import { VariablesContext } from '../Context/Variables.Context';
import { useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { LoadingContext } from '../Context/Load.Context';
import axios from 'axios';
import { Alert } from 'react-native';
import { DataContext } from '../Context/Datos.Context';
import { AlertMessage } from '../Util/Alert';

export function useWs() {
  const { uri } = useContext(VariablesContext);
  const Loading = useContext(LoadingContext);
  const url = `${uri}/api/`;
  const urlLogout = `${uri}Access/UnLogin`;
  function getDatawithStateAndLink(props) {
    Loading.LoadingIconTrue();
    const {
      urlComplement,
      state,
      nextAction,
      saveState,
      navigate,
      setToken,
    } = props;
    const Vurl = `${url}${urlComplement}`;
    axios.post(Vurl, { ...state }).then(async (res) => {
      console.log(res);
      try {
        const { data } = res;
        if (saveState !== undefined) {
          if (data.data !== null) saveState(data.data);
        }
        ('OtherAccion');
        Loading.LoadingFalse();
        if (data.result === 0) {
          Alert.alert(
            'YouTrain',
            `${res.data.message}`,
            [
              {
                text: 'OK',
                onPress:
                  data.result === 1
                    ? () => {
                      if (nextAction !== undefined) nextAction();
                    }
                    : null,
              },
            ],
            { cancelable: false },
          );
        }
        if (data.result === 1 && urlComplement === 'Access/Login') {
          console.log(res, 'USUARIO')
          const token =
            data.data[0].token !== undefined ? data.data[0].token : undefined;
          setToken(token);
          AsyncStorage.setItem('@App:Token', token)
            .then((valor) => { })
            .catch((error) => {
              console.log(error);
            });
        }
        if (data.result === 1 && urlComplement !== 'Access/Login') {
          Alert.alert(
            'YouTrain',
            `${'Usuario Registrado,'}`,
            [
              {
                text: 'OK',
                onPress:
                  data.result === 1
                    ? () => {
                      if (nextAction !== undefined) nextAction();
                      console.log("Aqui deberia Cambiar :'c");
                      navigate();
                    }
                    : null,
              },
            ],
            { cancelable: false },
          );
        }
      } catch (error) {
        console.log(error);
      }
    });
  }
  const FunctionsNoAuth = useMemo(() => {
    const { setToken } = useContext(DataContext);
    return {
      getToken: (setData) => {
        AsyncStorage.getItem('@App:Token').then((token) => {
          setToken(token);
          setData(token);
        });
      },
      signIn: (SaveRecuerdame, data) => {
        const urlC = 'Access/Login';
        SaveRecuerdame();
        try {
          AsyncStorage.removeItem('@App:Token');
        } catch (exception) {
          console.log(exception);
        }
        getDatawithStateAndLink({
          state: data,
          urlComplement: urlC,
          setToken: setToken,
        });
      },
      signUp: (data, { navigate }) => {
        Loading.LoadingIconTrue();
        const urlC = 'User/Create';
        getDatawithStateAndLink({
          state: data,
          urlComplement: urlC,
          navigate: navigate,
        });
      },
      signOut: () => {
        try {
          setToken(undefined);
          axios.post(urlLogout, { token: 'token' }).then(async (res) => { });
        } catch (error) {
          console.log(error);
        }
      },
      RequestCode: (data, navigation, setQrImage) => {
        Loading.LoadingIconTrue();
        const urlRequestCode = `User/RequestCode`;
        try {
          getDatawithStateAndLink({
            state: data,
            urlComplement: urlRequestCode,
            nextAction: navigation.pop(),
            saveState: setQrImage,
          });
        } catch (error) {
          console.log(error);
        }
      },
    };
  }, []);

  async function postDataAPI(props) {
    Loading.LoadingIconTrue();
    const { urlComplement, state, nextAction, identificador, saveState } = props;
    const Vurl = `${url}${urlComplement}`;
    try {
      const token = await AsyncStorage.getItem('@App:Token');
      axios
        .post(Vurl, state ? { ...state, token: token } : { token: token })
        .then(async (res) => {
          const { data } = res;
          Loading.LoadingFalse();
          switch (identificador) {
            case 'postDataAPISerProfesor':
              AlertMessage({ message: res.data.message, data: data });
              break;
            case 'CalificarProfesor':
              AlertMessage({
                message: res.data.message,
                data: data,
                nextAction: () => nextAction(),
              });
              break;
            case 'TomarEntrenamiento':
              AlertMessage({
                message: data.message==="La clase fue tomada por otro profesor."?"La clase fue tomada por otro profesor.":"Ya puedes dar clases en este Enrenamiento",
                data: data,
                nextAction: () => nextAction(),
              });
              console.log()
              break
            case 'NoTomarEntrenamiento':
              console.log(data.message)
              break
            case 'InscribirseEntrenamiento':
              console.log(res)
              AlertMessage({
                message: 'Ahora te encuentras inscripto a este entrenamiento.',
                data: data,
                nextAction: () => nextAction(),
              });
              break;
            case 'DarseDeBajaEntrenamiento':
              console.log(res)

              AlertMessage({
                message: !state.msg ? 'Baja Realizada, ahora no podras asistir a los entrenamientos.' : state.msg,
                data: data,
                nextAction: () => nextAction(),
              });
              break;
            case 'EntrenamientoCrear':
              console.log("Datos Enviados!!",res)
              AlertMessage({
                message: res.data.message === 'Creado con exito.' ? "Entrenamiento creado exitosamente."
                  // :res.data.message===?'Debes llenar todos los campos.'?
                  : res.data.message,
                data: data,
                nextAction: () => res.data.message === 'Creado con exito.' ? nextAction() : null,
              });
              break
            default:
              console.log('Funcion POST');
              break;
          }
        });
    } catch (error) {
      console.log(error);
    }
  }
  async function getDataAPI(props) {
    Loading.LoadingIconTrue();
    const { urlComplement, setData, iden, identificador, iden_region } = props;
    const Vurl = `${url}${urlComplement}`;

    try {
      const token = await AsyncStorage.getItem('@App:Token');

      axios
        .post(Vurl, iden ? { token: token, iden: iden } : { token: token })
        .then(async (res) => {
          const { data } = res.data;
          switch (identificador) {
            case 'ObtenerIdCategorisMaquinas':
              await setData(data);
              break;
            case 'BuscarPorCategoria':
              await setData(data[0].maquinas);
              break;
            case 'ObtenerProfesores':
              await setData(data);
              break;
            case 'ObtenerDiciplinas':
              await setData(data);
              break;
            case 'ObtenerDiciplina':
              // await setData({nombre:data[0].nombre, img:data[0].url_img});
              await setData({ nombre: data[0].nombre, img: 'http://45.236.130.116:92/img/entrenamiento/yoga.jpg' });

              break;
            case 'TipoProfesor':
              await setData(res.data.data[0].nombre);
              break;
            case 'GrupoEntrenamientoGetSugeridos':
              // console.log(token, res, 'Baabun');
              await setData(data);
              break;
            case 'GrupoEntrenamientoGetEntrenamiento':
              console.log('Consulta', 'Baabun');
              await setData(data);
              break;
            case 'ObtenerEntrenamientos':
              await setData(data[0]);
              break;
            case 'ObtenerListaMiembros':
              await setData(data);
              break;
            case 'IntegrantesGrupoEntrenamiento':
              await setData(data[0]);
              break;
            case 'CondominioUbicacion':
              await setData(data[0]);
              break;
            case 'GetProfesor':
              await setData(data[0]);
              break;
            case 'UserList':
              await setData(data);
              break;
            case 'TipoDisiplina':
              await setData(res.data.data ? res.data.data : []);
              break;
            case 'ListRegion':
              await setData(data)
              break;
            case 'ListComuna':
              await setData(data)
              break;

            default:
              console.log(res, ':D Esta invita la casa');
              break;
          }
          Loading.LoadingFalse();
        });
    } catch (error) {
      console.log(error);
    }
  }

  const FunctionsAuth = useMemo(() => {
    return {
      getDataAPITipoMAquinas: async (Setstate) => {
        await getDataAPI({
          urlComplement: 'TipoMaquina/List',
          setData: Setstate,
          identificador: 'ObtenerIdCategorisMaquinas',
        });
      },
      getDataValidateTokenAndGetUser: async (setState) => {
        console.log('Ponte Rikoso')
      },
      /**Anteriormente puse esta funcion aún desconozco para que servia se reemplazo por la de arriba */
      // getDataAPITipoMAquinas: async (Setstate, iden) => {
      //   console.log(Setstate, iden,'Sera que')
      //   await getDataAPI({ urlComplement: 'TipoMaquina/List', setData: Setstate, iden: iden.EntrenamientoID, identificador: 'ObtenerIdCategorisMaquinas' })
      // },
      getDataAPIMAquinas: async (Setstate, iden) => {
        await getDataAPI({
          urlComplement: 'TipoMaquina/List',
          setData: Setstate,
          iden: iden,
          identificador: 'BuscarPorCategoria',
        });
      },
      getDataAPIProfesores: async (Setstate) => {
        await getDataAPI({
          urlComplement: 'Profesor/List',
          setData: Setstate,
          identificador: 'ObtenerProfesores',
        });
      },
      getDataAPITipoProfesor: async (setState, iden) => {
        await getDataAPI({
          urlComplement: 'Profesor/List',
          iden,
          setData: setState,
          identificador: 'TipoProfesor',
        });
      },
      getDataAPIObtenerDiciplinas: async (Setstate) => {
        await getDataAPI({
          urlComplement: 'Profesor/ListTipo',
          setData: Setstate,
          identificador: 'ObtenerDiciplinas',
        });
      },
      getDataAPIObtenerDiciplina: async (Setstate, iden) => {
        await getDataAPI({
          urlComplement: 'Profesor/ListTipo',
          setData: Setstate,
          iden: iden,
          identificador: 'ObtenerDiciplina',
        });
      },
      postDataAPISerProfesor: async ({ state, nextAction }) => {
        await postDataAPI({
          state: state,
          urlComplement: 'Profesor/Apply',
          nextAction: nextAction,
        });
      },


      getDataAPIGrupoEntrenamientoGetSugeridos: async (Setstate) => {
        await getDataAPI({
          urlComplement: 'Entrenamiento/ListSuggested',
          setData: Setstate,
          identificador: 'GrupoEntrenamientoGetSugeridos',
        });
      },
      getDataAPIGrupoEntrenamientoGetEntrenamiento: async (Setstate) => {
        await getDataAPI({
          urlComplement: 'Entrenamiento/List',
          setData: Setstate,
          identificador: 'GrupoEntrenamientoGetEntrenamiento',
        });
      },
      getDataAPIEntrenamientos: async (Setstate, iden) => {
        await getDataAPI({
          urlComplement: 'Entrenamiento/List',
          iden: iden,
          setData: Setstate,
          identificador: 'ObtenerEntrenamientos',
        });
      },
      getDataAPIListMembers: async (Setstate, iden) => {
        await getDataAPI({
          urlComplement: 'Entrenamiento/ListMembers',
          iden: iden,
          setData: Setstate,
          identificador: 'ObtenerListaMiembros',
        });
      },
      getDataAPIIntegrantesGrupoEntrenamiento: async (Setstate, iden) => {
        await getDataAPI({
          urlComplement: 'User/List',
          iden: iden,
          setData: Setstate,
          identificador: 'IntegrantesGrupoEntrenamiento',
        });
      },
      getDataAPIUbicacionGrupoEntrenamiento: async (Setstate, iden) => {
        await getDataAPI({
          urlComplement: 'Condominio/List',
          iden: iden,
          setData: Setstate,
          identificador: 'CondominioUbicacion',
        });
      },
      getDataAPIProfesor: async (Setstate, iden) => {
        await getDataAPI({
          urlComplement: 'Profesor/List',
          iden: iden,
          setData: Setstate,
          identificador: 'GetProfesor',
        });
      },
      postDataAPICalificarProfesor: async (state, nextAction) => {
        await postDataAPI({
          state: state,
          urlComplement: 'Profesor/Qualify',
          nextAction: nextAction,
          identificador: 'CalificarProfesor',
        });
      },

      postDataAPITomarEntrenamiento: async (state, nextAction) => {
        await postDataAPI({
          state: state,
          urlComplement: 'Entrenamiento/Take',
          nextAction: nextAction,
          identificador: 'TomarEntrenamiento',
        });
      },
      postDataAPINoTomarEntrenamiento: async (state, nextAction) => {
        await postDataAPI({
          state: state,
          urlComplement: 'Entrenamiento/Take',
          nextAction: nextAction,
          identificador: 'NoTomarEntrenamiento',
        });
      },
      postDataAPIInscribirseEntrenamiento: async (state, nextAction) => {
        await postDataAPI({
          state: state,
          urlComplement: 'Entrenamiento/Answer',
          nextAction: nextAction,
          identificador: 'InscribirseEntrenamiento',
        });
      },
      postDataAPIDarseDeBajaEntrenamiento: async (state, nextAction) => {
        await postDataAPI({
          state: state,
          urlComplement: 'Entrenamiento/Answer',
          nextAction: nextAction,
          identificador: 'DarseDeBajaEntrenamiento',
        });
      },
      getDataApIUserList: async (Setstate) => {
        await getDataAPI({
          urlComplement: 'User/List',
          setData: Setstate,
          identificador: 'UserList',
        });
      },
      getDataAPITipoDisiplina: async (Setstate) => {
        await getDataAPI({
          urlComplement: 'Profesor/ListTipo',
          setData: Setstate,
          identificador: 'TipoDisiplina',
        });
      },
      getDataAPIListRegion: async (Setstate) => {
        await getDataAPI({
          urlComplement: 'Comuna/ListRegion',
          setData: Setstate,
          identificador: 'ListRegion',
        })
      },
      getDataAPIListComuna: async (Setstate) => {
        await getDataAPI({
          urlComplement: 'Comuna/ListComunaUser',
          setData: Setstate,
          identificador: 'ListComuna',
        })
      },
      postDataApiCrearEntrenamiento: async (state, nextAction) => {
        await postDataAPI({
          urlComplement: 'Entrenamiento/Create',
          state: state,
          nextAction: nextAction,
          identificador: 'EntrenamientoCrear',
        })
      }
    };
  }, []);

  return {
    FunctionsNoAuth,
    FunctionsAuth,
  };
}
