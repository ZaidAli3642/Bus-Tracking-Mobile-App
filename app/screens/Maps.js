import { StyleSheet } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

import { useApi } from "../hooks/useApi";
import { GOOGLE_MAPS_APIKEY } from "../maps/maps";
import { getBusRoutes } from "../firebase/firebaseCalls/bus";
import AuthContext from "../context/AuthContext";

const Maps = () => {
  const { user } = useContext(AuthContext);
  const mapViewRef = useRef();
  const [coordinates, setCoordinates] = useState([]);
  const { data, request } = useApi(getBusRoutes);

  const coordinatesCopy = [...coordinates];
  const origin = coordinatesCopy.shift();
  const destination = coordinatesCopy.pop();

  const setBusRoutes = () => {
    if (data.length > 0) {
      const busRoutes = data[0].busRoutes;
      const convertedBusRoutes = busRoutes.map((route) => ({
        coordinates: {
          latitude: Number(route.latitude),
          longitude: Number(route.longitude),
        },
      }));

      setCoordinates(convertedBusRoutes);
    }
  };

  useEffect(() => {
    request(user);
  }, []);

  useEffect(() => {
    setBusRoutes();
  }, [data]);

  return (
    <MapView
      ref={mapViewRef}
      style={StyleSheet.absoluteFillObject}
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      loadingBackgroundColor="#eeeeee"
      loadingIndicatorColor="#666666"
      loadingEnabled={true}
    >
      {coordinates.length > 0 &&
        coordinates?.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.coordinates}
            title={marker.title}
          />
        ))}

      {coordinates.length > 0 && (
        <MapViewDirections
          strokeWidth={3}
          strokeColor="red"
          onReady={(result) =>
            mapViewRef.current.fitToCoordinates(result.coordinates, {
              edgePadding: {
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              },
            })
          }
          waypoints={coordinatesCopy?.map((waypoint) => waypoint.coordinates)}
          origin={origin?.coordinates}
          destination={destination?.coordinates}
          apikey={GOOGLE_MAPS_APIKEY}
        />
      )}
    </MapView>
  );
};

export default Maps;

const styles = StyleSheet.create({});
