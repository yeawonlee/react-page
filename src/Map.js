import React, { useState, useEffect } from "react";
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import "./App.css";
import Header from "./Header";
import BackButton from "./BackButton";

// dotenv. 포트, DB 계정 정보, API 키 등을 외부 환경변수 파일로 관리할 수 있게 해주는 라이브러리
import dotenv from "dotenv";

// React Clock Library
import Clock from "react-live-clock";

// Google Map
import {
  InfoWindow,
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import Geocode from "react-geocode";

/*
 * ['react-google-maps' github.io]: https://tomchentw.github.io/react-google-maps/
 * ['react-geocode' github]: https://github.com/shukerullah/react-geocode
 * [Google Geocoding API 문서]: https://developers.google.com/maps/documentation/geocoding/overview
 */

dotenv.config({ path: "../.env" });
const apiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
const googleMapURL = "https://maps.googleapis.com/maps/api/js?key=" + apiKey + "&v=3.exp&libraries=geometry,drawing,places";

Geocode.setApiKey(apiKey);
Geocode.setLanguage("ko");
Geocode.enableDebug();

// Google geocoder는 주어진 위/경도에 대해 둘 이상의 주소를 반환. "ROOFTOP" param이 가장 정확한 결과를 반환함
Geocode.setLocationType("ROOFTOP");

const Map = () => {

  const [address, setAddress] = useState("");
  const [zoom, setZoom] = useState(20);
  const [height, setHeight] = useState(800);
  const [mapPosition, setMapPosition] = useState({
    lat: 0,
    lng: 0,
  });
  const [markerPosition, setMarkerPosition] = useState({
    lat: 0,
    lng: 0,
  });

  console.log(1)
  useEffect(() => {
    
    //console.log('showCurrentLocation 함수 들어옴');

    // HTML5 geolocation
    if (navigator.geolocation) {
      // navigator.geolocation.getCurrentPosition(successCallback, errorCallback, [options])
      console.log("test")
      navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
    } else {
      // Browser가 GeoLocation을 지원하지 않을 때
      console.error("Geolocation is not supported by this browser!");
      alert("해당 브라우저에서는 위치 정보 기능을 제공하지 않습니다.");
      return;
    }
  }, []);


  // getCurrentPosition successCallback
  const successHandler = (position) => {

    // 장치의 현재 위치를 가져옴
    setMapPosition({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
    console.log(`(state) MapPosition lat: ${position.coords.latitude}`);
    console.log(`(state) MapPosition lng: ${position.coords.longitude}`);

    setMarkerPosition({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });

    // Geocoding
    // Get formatted address, city, state, country from latitude & longitude when
    // Geocode.setLocationType("ROOFTOP") enabled
    // the below parser will work for most of the countries
    Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(response => {
      //console.log(`(state) markerPosition lng: ${markerPosition.lat}`);
      //console.log(`(state) markerPosition lng: ${markerPosition.lng}`);

      console.log('response ', response);

      /** formatted_address: 사람이 읽을 수 있는 이 위치의 주소를 포함하는 문자열 */
      const address = response.results[0].formatted_address;

      setAddress(
        (address) ? address : "",
      );

      // Get latitude & longitude from address.
      Geocode.fromAddress(address).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;

          setMapPosition({
            lat: lat,
            lng: lng,
          });
      
          setMarkerPosition({
            lat: lat,
            lng: lng,
          });

          console.log(address + "의 위도/경도 좌표: (" + lat + ", " + lng + ")");

        }, (error) => {
          console.error(error);
        }
      )
      
    }, (error) => {
      console.error(error);
      alert(error);
    }) 
  };
  

  // getCurrentPosition errorCallback
  const errorHandler = (error) => {
    console.error(`ERROR(${error.code}): ${error.message}`);
    alert(`ERROR: ${error.message}`);
  };


  // Marker 이동했을 때 이벤트 핸들링
  const onMarkerDragEnd = (event) => {
    let newLat = event.latLng.lat();
    let newLng = event.latLng.lng();

    // Get formatted address, city, state, country from latitude & longitude when
    // Geocode.setLocationType("ROOFTOP") enabled
    // the below parser will work for most of the countries
    Geocode.fromLatLng(newLat, newLng).then(
      (response) => {
        /*
         * 크롬 > 개발자 도구 콘솔창
         * response { plus_code: {...}, result: {...}, status: 'OK' } 확인 가능
         * response > results > 0 > formatted_address를 보면,
         * "30 Sadang-ro 26-gil, Dongjak-gu, Seoul, South Korea" 이런 식으로 주소 확인이 가능하다!
         */
        console.log("response ", response);

        /*
         * console 창의 response 값 그대로 따라가면 됨.
         *
         * addressArray는
         * '  response   >   results: Array(size)   >   index:   >   address_components: Array(size)  '
         */
        const address = response.results[0].formatted_address;

        setAddress(
          (address) ? address : "",
        );

        setMapPosition({
          lat: newLat,
          lng: newLng,
        });

        setMarkerPosition({
          lat: newLat,
          lng: newLng,
        });

        console.log("이동한 위치의 좌표: (" + newLat + ", " + newLng + ")");

        // Get latitude & longitude from address.
        Geocode.fromAddress(address).then(
          (response) => {
            const { lat, lng } = response.results[0].geometry.location;
            
            setMapPosition({
              lat: newLat,
              lng: newLng,
            });
    
            setMarkerPosition({
              lat: newLat,
              lng: newLng,
            });

            console.log(
              address + "의 위도/경도 좌표: (" + lat + ", " + lng + ")"
            );
          },

          (error) => {
            console.error(error);
          }
        );
      },
      (error) => {
        console.error(error);
      }
    );
  };

  /**
   * In order to initialize the MyMapComponent with DOM instances, you'll need to wrap it with 'withGoogleMap' HOC.
   * In order to currently load Google Maps JavaScript API v3, you'll need to wrap it with 'withScriptjs' HOC.
   */
  const MapWithAMarker = withScriptjs(
    withGoogleMap((props) => (
      <GoogleMap
        defaultZoom={15}
        defaultCenter={{
          lat: mapPosition.lat,
          lng: mapPosition.lng,
        }}
      >
        <Marker
          draggable={true}
          onDragEnd={onMarkerDragEnd}
          position={{
            lat: markerPosition.lat,
            lng: markerPosition.lng,
          }}
        >
          <InfoWindow>
            <div>{address}</div>
          </InfoWindow>
        </Marker>
      </GoogleMap>
    ))
  );

  return (
    <div className="App">
      <Header title="Map"></Header>
      <main>
        <section>
          {/* 현재 시각, 이름, 상세주소 */}
          <div className="form">
            <div className="dx-fieldset">
              <div className="dx-field">
                <div className="dx-field-label">현재 시간:</div>
                <div className="dx-field-value-static">
                  <Clock
                    format={"YYYY년 MM월 DD일 dddd, a h:mm:ss"}
                    ticking={true}
                    timezone={"Asia/Seoul"}
                    locale={"ko"}
                  ></Clock>
                </div>
              </div>
              <div className="dx-field">
                <div className="dx-field-label">위도 :</div>
                <div className="dx-field-value-static">{markerPosition.lat}</div>
              </div>
              <div className="dx-field">
                <div className="dx-field-label">경도 :</div>
                <div className="dx-field-value-static">{markerPosition.lng}</div>
              </div>
              <div className="dx-field">
                <div className="dx-field-label">상세 주소 :</div>
                <div className="dx-field-value-static">{address}</div>
              </div>
            </div>
          </div>
        </section>

        <section>
          {/* 지도 */}
          <div className="flex-item">
            <MapWithAMarker
              googleMapURL={googleMapURL}
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `400px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
          </div>
        </section>
      </main>
      <BackButton></BackButton>
    </div>
  );
};

export default Map;