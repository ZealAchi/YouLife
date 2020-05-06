import React from 'react';
import styled  from 'styled-components/native'
import { Texto } from './Text'
import { View } from 'native-base';

const ButtonPersonal = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  background-color: ${props => {
        if (props.background !== undefined) {
            return props.background;
        } else {
            return '#D6EA5F';
        }
    }};
  border-radius: 5px;
  height: 35px;
`;

export const Button = (props) => {
    
    const { label, color,size, Bold, backgroundColor, styleButton = {}, styleText = {}, onPress = () => { }, icon, children } = props
    return (<ButtonPersonal background={backgroundColor} style={styleButton} onPress={onPress}>
        {children ? children : (<View style={{ flexDirection: 'row', alignContent: 'space-around' }}>
            {icon && icon.position == 'left' && icon.element}
            <Texto Bold size={size&&size}  fontFamily={Bold?'RobotoSlab-Bold':'RobotoSlab-Light'} colorLabel={color&&color} style={[styleText, icon?icon.position == 'left':null ? { paddingLeft: 8 } : { paddingRight: 8 }]}>
                {label}
            </Texto>
            {icon && icon.position == 'right' && icon.element}
        </View>)}
    </ButtonPersonal>)
}
