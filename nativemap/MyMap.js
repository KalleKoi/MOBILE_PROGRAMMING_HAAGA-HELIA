import MapView, { Marker } from 'react-native-maps';
import { useState } from 'react';
import { Button, View } from 'react-native';
import * as Location from 'expo-location';

export default function MyMap() {
    const [region, setRegion] = useState({
        latitude: 60.200692,
        longitude: 24.934302,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221,
    })

    const moveMap = () => {
        setRegion({ ...region, longitude: region.longitude + 1 })

    }

    return (
        <View style={{ flex: 1 }}>
            <MapView
                style={{ width: '100%', height: '90%' }}
                region={region}
            >
                <Marker
                    title="Marker"
                    description="This is a marker in Helsinki"
                    pinColor='green'
                    coordinate={{
                        latitude: 60.200692,
                        longitude: 24.934302
                    }}
                />
            </MapView>
            <Button title="Move map" onPress={moveMap} />
        </View>
    );
}