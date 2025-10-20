import { Pressable, StyleSheet, Text, Image,View } from "react-native";

export const FokusButton = ({ onPress, isRunning }) => {
  return (
    <View>
      <Pressable style={styles.button} onPress={onPress}>
        <Image 
          source={isRunning ? require('../../assets/images/pause.png') : require('../../assets/images/play_arrow.png')} 
          style={styles.icon}
        />
        <Text style={styles.buttonText}>
          {isRunning ? 'Pausar' : 'Começar'}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection:"row",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#B872FF",
    borderRadius: 32,
    padding: 8,
  },

  buttonText: {
    textAlign: "center",
    color: "#021123",
    marginLeft: 8,
    fontSize: 18,
  },

  icon: {
    alignItems:"center",
    tintColor: '#000000',     
  },

})