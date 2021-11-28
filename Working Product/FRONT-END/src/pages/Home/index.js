import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { BackIcon } from '../../assets';

const Home = ({navigation}) => {
    return(
        <TouchableOpacity onPress={() => handleGoTo('SignIn')}>
          <Image source={BackIcon} style={styles.iconBack} />
        </TouchableOpacity>
    );

    };

export default Home;
