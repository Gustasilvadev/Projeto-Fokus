import { useRef, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { ActionButton } from "../components/ActionButton";
import { FokusButton } from "../components/FokusButton";
import { Timer } from "../components/Timer";


const pomodoro = [
  {
    id:"focus",
    initialValue:25 * 60,
    image:require('../assets/images/foco.png'),
    display: "Foco",

  },
  {
    id:"short",
    initialValue:5 * 60,
    image:require('../assets/images/descanso_curto.png'),
    display: "Pausa curta",
  
  },
  {
    id:"long",
    initialValue:15 * 60,
    image:require('../assets/images/descanso_longo.png'),
    display: "Pausa longa"
  
  },
]

export default function Index() {

  const [timerType, setTimerType] = useState(pomodoro[0])
  const [timeLeft, setTimeLeft] = useState(timerType.initialValue)
  const [isRunning, setIsRunning] = useState(false)
  const timerRef = useRef(null) /** Hook sincrono do react */

    const toggleTimer = () => {  /** Função da logica do botao começar/pausar */
      if (timerRef.current) {
        // Pausar
        clearInterval(timerRef.current)
        timerRef.current = null
        setIsRunning(false)
      } else {
        // Começar
        setIsRunning(true)
        const id = setInterval(() => {
          setTimeLeft(prevTime => {
            if (prevTime <= 1) {
              // Timer chegou a zero
              clearInterval(id)
              timerRef.current = null
              setIsRunning(false)
              alert(`Timer ${timerType.display} finalizado!`)
              return 0
            }
            return prevTime - 1
          })
        }, 1000) /** Função do js, espera uma função e o tempo */
        timerRef.current = id
      }
    }

    // Também precisamos atualizar o timer quando mudar o tipo
    const handleTimerTypeChange = (newTimerType) => {
      setTimerType(newTimerType)
      setTimeLeft(newTimerType.initialValue)
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
      setIsRunning(false)
    }

  return (
    <View style={styles.container}>
      <Image source={timerType.image} />

      <View style={styles.actions}>

        <View style={styles.context}>
          {pomodoro.map(p => (
            <ActionButton 
              key={p.id}
              active={timerType.id === p.id}
              onPress={() => handleTimerTypeChange(p)}
              display={p.display}
            />
          ))}
        </View>

      
        <Timer totalSeconds={timeLeft} />

        <FokusButton onPress={toggleTimer} isRunning={isRunning} />

      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Projeto ficticio e sem fins comerciais.
        </Text>
        <Text style={styles.footerText}>
          Desenvolvido por Aluno.
        </Text>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container:{
    flex:1,
    justifyContent: "center",
    alignItems:"center",
    backgroundColor: '#021123',
    gap:40,
  },

  actions:{
    padding:24,
    backgroundColor: '#14458080',
    width:'80%',
    height:'30%',
    borderRadius:32,
    borderColor: '#144480',
    borderWidth:2,
    justifyContent:"center",
    gap:32,

  },

  context: {
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-around",

  },
  footer:{
    width:'80%',
  },

  footerText: {
    textAlign:"center",
    fontSize:12.5,
    color:'#98A0A8',

  }


})