import { ScrollView, View, TouchableOpacity } from 'react-native';
import Actions from '../Actions';
import { Header, Title, Banner, SliderLojas } from '../../components/style';
import { lojas } from '../../components/dadosLojas';


export function Homepage() {



    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <Header>
                <Title text="Explore nossa cultura!" />
                <TouchableOpacity activeOpacity={0.9}>
                    <Banner />
                </TouchableOpacity>
            </Header>

            <Actions />

            <View>
                <Title text="Mais Visitados" marginTop={'3%'} />
            </View>

            <SliderLojas data={lojas.filter(loja => ['1', '3', '5', '4', '6'].includes(loja.id))} />

            <View>
                <Title text="Novidades" marginTop={'5%'} />
            </View>

            <SliderLojas data={lojas.filter(loja => ['2', '4', '6'].includes(loja.id))} />
        </ScrollView>
    );
}
