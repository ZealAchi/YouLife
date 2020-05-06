import React from 'react'
import { Container, Header, Content, Form, Item, Input as InputNB, Label } from 'native-base';
import Colors from './Colors';


export function Input (props) {
    const { label, value, onChange,multiline,numberOfLines } = props
    return (
        <Item floatingLabel style={{bottom:-2}}>
            <Label style={{ fontFamily: 'RobotoSlab-Bold', left: 2, bottom: -4, color: Colors.TercerColor }}>{label}</Label>
            <InputNB value={value} multiline={multiline} numberOfLines={numberOfLines} onChangeText={onChange} placeholderTextColor="white" style={{color:'white'}}/>
        </Item>
    )
}

