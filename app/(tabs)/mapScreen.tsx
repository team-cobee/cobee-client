import MainLayout from "@/components/layout/MainLayout";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { MapStyleElement, Marker } from "react-native-maps";

const { width } = Dimensions.get("window");

const lightMapStyle: MapStyleElement[] | undefined = [];

type FilterKey = "반경" | "월세" | "보증금" | "인원";

const filterConfigs: Record<
  FilterKey,
  {
    min: number;
    max: number;
    step: number;
    unit: string;
    defaultValue: number;
  }
> = {
  반경: { min: 0, max: 10, step: 0.1, unit: "km", defaultValue: 2.5 },
  월세: { min: 0, max: 200, step: 5, unit: "만원", defaultValue: 50 },
  보증금: { min: 0, max: 3000, step: 100, unit: "만원", defaultValue: 500 },
  인원: { min: 1, max: 10, step: 1, unit: "명", defaultValue: 2 },
};

const MapScreen = () => {
  const [search, setSearch] = useState("");
  const [markers, setMarkers] = useState([
    { id: 1, lat: 37.54647500000001, lng: 126.9646916, title: "기본 위치" },
  ]);
  const [activeFilter, setActiveFilter] = useState<null | FilterKey>(null);
  const [filterValues, setFilterValues] = useState<Record<FilterKey, number>>({
    반경: 2.5,
    월세: 50,
    보증금: 500,
    인원: 2,
  });
  const [tempValue, setTempValue] = useState(2.5);
  const mapRef = useRef<MapView>(null);
  const filterTags: FilterKey[] = ["반경", "월세", "보증금", "인원"];

  const openModal = (key: FilterKey) => {
    setActiveFilter(key);
    setTempValue(filterValues[key]);
  };

  const resetFilter = () => {
    if (activeFilter) {
      setTempValue(filterConfigs[activeFilter].defaultValue);
    }
  };

  const confirmFilter = () => {
    if (activeFilter) {
      setFilterValues((prev) => ({
        ...prev,
        [activeFilter]: tempValue,
      }));
      setActiveFilter(null);
    }
  };

  const searchPlace = async (query: string) => {
    if (!query.trim()) return;
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}&limit=1`
      );
      const data = await response.json();

      if (data?.length > 0) {
        const place = data[0];
        const lat = parseFloat(place.lat);
        const lng = parseFloat(place.lon);
        mapRef.current?.animateToRegion(
          {
            latitude: lat,
            longitude: lng,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          },
          1000
        );
        setMarkers([
          ...markers,
          {
            id: Date.now(),
            lat,
            lng,
            title: place.display_name.split(",")[0],
          },
        ]);
      } else {
        Alert.alert("검색 결과 없음", "해당 장소를 찾을 수 없습니다.");
      }
    } catch (error) {
      Alert.alert("오류", "검색 중 오류가 발생했습니다.");
    }
  };

  return (
    <MainLayout
      title="CoBee"
      titleStyle={{ fontWeight: "bold", color: "#3D2C1E", fontSize: 16 }}
      showTabs
    >
      <View style={styles.container}>
        {/* 지도 */} 
        <MapView
          ref={mapRef}
          style={StyleSheet.absoluteFillObject}
          initialRegion={{
            latitude: 37.6079,
            longitude: 126.9624,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          showsUserLocation
          showsMyLocationButton
          mapType="standard"
          customMapStyle={lightMapStyle}
        >
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              coordinate={{ latitude: marker.lat, longitude: marker.lng }}
              title={marker.title}
            />
          ))}
        </MapView>

        {/* 검색창 */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <TextInput
              placeholder="지역, 지하철, 대학, 단지"
              style={styles.searchInput}
              placeholderTextColor="#878686"
              value={search}
              onChangeText={setSearch}
              onSubmitEditing={() => searchPlace(search)}
            />
            <TouchableOpacity onPress={() => searchPlace(search)}>
              <Ionicons name="search" size={20} color="#999" />
            </TouchableOpacity>
          </View>
        </View>

        {/* 필터 버튼 */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}
        >
          {filterTags.map((tag) => (
            <TouchableOpacity
              key={tag}
              style={styles.filterButton}
              onPress={() => openModal(tag)}
            >
              <Text style={styles.filterText}>{tag}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* 모달 */} 
        <Modal visible={!!activeFilter} animationType="slide" transparent>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              {activeFilter && (
                <>
                  <Text style={styles.modalTitle}>{activeFilter}</Text>
                  <Text style={styles.sliderValue}>
                    {tempValue} {filterConfigs[activeFilter].unit}
                  </Text>
                  <Slider
                    value={tempValue}
                    minimumValue={filterConfigs[activeFilter].min}
                    maximumValue={filterConfigs[activeFilter].max}
                    step={filterConfigs[activeFilter].step}
                    onValueChange={setTempValue}
                    minimumTrackTintColor="#F7B32B"
                    maximumTrackTintColor="#ddd"
                    thumbTintColor="#F7B32B"
                    style={{ width: "100%" }}
                  />
                  <View style={styles.modalButtons}>
                    <TouchableOpacity
                      onPress={resetFilter}
                      style={[styles.modalButton, styles.resetButton]}
                    >
                      <Text style={styles.resetText}>초기화</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={confirmFilter}
                      style={[styles.modalButton, styles.confirmButton]}
                    >
                      <Text style={styles.confirmText}>확인</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          </View>
        </Modal>
      </View>
    </MainLayout>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  searchContainer: {
    position: "absolute",
    top: 20,
    left: 30,
    right: 30,
    zIndex: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#333",
    paddingRight: 8,
  },
  filterContainer: {
    position: "absolute",
    top: 75,
    left: 40,
    flexDirection: "row",
    zIndex: 10,
    paddingTop: 4,
  },
  filterButton: {
    backgroundColor: "#F7B32B",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
  },
  filterText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#fff",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sliderValue: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333",
  },
  modalButtons: {
    flexDirection: "row",
    marginTop: 20,
    gap: 8,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  resetButton: {
    borderWidth: 1,
    borderColor: "#F7B32B",
  },
  resetText: {
    color: "#F7B32B",
    fontWeight: "bold",
  },
  confirmButton: {
    backgroundColor: "#F7B32B",
  },
  confirmText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
