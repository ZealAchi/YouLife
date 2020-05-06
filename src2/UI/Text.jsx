import { Text } from 'native-base';

import styled from 'styled-components/native'

export const Texto =styled(Text)`
font-family: ${props => {
    if(props.Bold){
      return 'RobotoSlab-Bold';
    }else{
      return 'RobotoSlab-Light';
    }
  }};
  
  font-size: ${props => {
    if (props.size !== undefined) {
      return `${props.size}px`;
    } else {
      return '20px';
    }
  }};
  text-align: ${props => {
    if (props.textAlign !== undefined) {
      return props.textAlign;
    } else {
      return 'left';
    }
  }};
  color: ${props => {
    if (props.colorLabel !== undefined) {
      return props.colorLabel;
    } else {
      return '#000';
    }
  }};
`