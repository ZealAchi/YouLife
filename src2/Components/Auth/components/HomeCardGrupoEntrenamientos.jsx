import React, { useState,useEffect } from 'react'
import styled from 'styled-components/native'
import { useWs } from '../../../Hooks/useWS'
import { ItemGrupoEntrenamiento } from '../HomeGym/Components/ItemGrupoEntrenamiento'

export function HomeCardGrupoEntrenamiento(props) {
    
    const [entrenamiento, setEntrenamiento] = useState(null)
    
    const Ws = useWs()
    
    useEffect(() => {
      if(entrenamiento===null)
        Ws.FunctionsAuth.getDataAPIGrupoEntrenamientoGetEntrenamiento(setEntrenamiento)
      }, [props])
    return (
      <ItemGrupoEntrenamiento Data={entrenamiento} navigation={props.navigation} title="PrincipalHome" />
    )
}