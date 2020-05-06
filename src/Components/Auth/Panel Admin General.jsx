import React from 'react'
import { Texto } from '../../UI/Text'
import { Button } from '../../UI/Button'


export function PanelAdminGeneral(props){
    const { navigation } = props
    return (<>
        <Button onPress={() => { navigation.navigate('Usuarios') }}>
            <Texto>
                Usuarios
        </Texto>
        </Button>
        <Button>
            <Texto>
                Salas Comunes
        </Texto>
        </Button>
        <Button>
            <Texto>
                Mural de Avisos
        </Texto>
        </Button>
        <Button>
            <Texto>
                Pagos
        </Texto>
        </Button>
        <Button>
            <Texto>
                Gimnasios
        </Texto>
        </Button>
        <Button onPress={()=>{navigation.navigate('MantencionesAdminGeneral')}}>
            <Texto>
                Mantenciones
        </Texto>
        </Button>

    </>
    )

}