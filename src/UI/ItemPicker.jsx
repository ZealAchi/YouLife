import React from 'react'

import { Picker, View} from 'native-base'
import { Texto } from './Text'
export const ItemPicker = (props) => {
    const { state, data, label, onChange }=props
    return (
        <>
            <Texto colorLabel={'white'} size={15} fontFamily="normal">
                {label}
            </Texto>
             <Picker
                selectedValue={state.disiplina}
                placeholderIconColor={'#ddd'}
                style={{ height: 50, width: '100%', color: 'white'}}
                onValueChange={onChange}>
                {data?data.map((item, i) => {
                    return (
                        <Picker.Item key={i} label={item.nombre ? item.nombre : item} value={item.iden ? item.iden : item} />
                    )
                }):null}
            </Picker> 
        </>
    )
}
