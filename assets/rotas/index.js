import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {Ionicons} from '@expo/vector-icons'
import {Homepage} from '../Screens/homepage'
import {Busca} from '../Screens/busca'
import {Favoritos} from '../Screens/favoritos'

const Tab = createBottomTabNavigator();


export function Rotas(){
    return(
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarHideOnKeyboard: true,
                tabBarShowLabel: false,
                tabBarActiveTintColor: '#DD9D27',
            }}
        >
            <Tab.Screen name="Home" component={Homepage} 
            options={{tabBarIcon: ({ color, size, focused }) => {
                if (focused){
                   return <Ionicons name="home" color='#DD9D27' size={size}/>
                }
                return <Ionicons name="home-outline" color={color} size={size}/>

            }
            }}/>
            <Tab.Screen name='Busca' component={Busca} options={{tabBarIcon: ({ color, size, focused }) => {
                if (focused){
                   return <Ionicons name="search" color='#DD9D27' size={size}/>
                }
                return <Ionicons name="search-outline" color={color} size={size}/>

            }
            }}/>
            <Tab.Screen name='Favoritos' component={Favoritos} options={{tabBarIcon: ({ color, size, focused }) => {
                if (focused){
                   return <Ionicons name="star" color='#DD9D27' size={size}/>
                }
                return <Ionicons name="star-outline" color={color} size={size}/>

            }
            }}/>
        </Tab.Navigator>
    )
}

