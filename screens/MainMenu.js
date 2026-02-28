import {View, Text, Button} from   'react-native'

export default function MainMenuScreen ({navigation}) {
    return(
        <View style = {{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Text style = {{fontSize: 24, marginBottom: 20}}>
                Pizzeria App
            </Text>
        
        <Button 
            title="Entrar como Cliente"
            onPress= {() => navigation.navigate ("CustomerHome")}
        />
         <Button 
            title="Entrar como Empleado"
            onPress= {() => navigation.navigate ("EmployeeLogin")}
        />

        </View>
    );
}