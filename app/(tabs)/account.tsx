import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type User = {
  name: string;
  birth: string;
  gender: string;
  profileImageUrl: string;
};

export default function AccountSettings() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const fetchUserData = async (): Promise<User> => ({
    name: '김박수',
    birth: '2002.04.30',
    gender: '여성',
    profileImageUrl: 'https://via.placeholder.com/56',
  });

  useEffect(() => {
    fetchUserData().then(data => setUser(data as any));
  }, []);

  const menuItems = [
    '회원 정보 수정',
    '알림 설정',
    '공개 프로필 수정',
    '제출 명단 확인',
    '내가 쓴 구인글',
    '로그아웃',
    '회원탈퇴',
  ];
  
  //로그아웃 처리
  const handleConfirmLogout = (): void => {
    setModalVisible(false);
    // TODO: 실제 로그아웃 로직 또는 navigation
    router.replace('/login');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/*헤더*/}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          {/* 뒤로가기 아이콘 (x=12, y=13) */}
          <TouchableOpacity onPress={() => router.back()} style={styles.iconBack}>
            <Ionicons name="arrow-back" size={20} color="#333" />
          </TouchableOpacity>
          {/* 중앙 타이틀 */}
          <Text style={styles.headerTitle}>계정 설정</Text>
          {/* 알림 아이콘 (x=353, y=10) */}
          <TouchableOpacity style={styles.iconBell}>
            <Ionicons name="notifications-outline" size={20} color="#333" />
          </TouchableOpacity>
        </View>

        {/* 프로필 섹션 */}
        {user ? (
          <View style={styles.profileSection}>
            <Image
              source={{ uri: user.profileImageUrl }}
              style={styles.profileImg}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.name}>{user.name}</Text>
              <Text style={styles.subInfo}>
                {user.birth} / {user.gender}
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.loading}>
            <ActivityIndicator size="small" color="#fff" />
          </View>
        )}
      </View>
      {/* 빈 카드 */}
      <View style={styles.blankCard} />

      {/* 메뉴 리스트 */}
      <View style={styles.menuContainer}>
        {menuItems.map(item => (
          <TouchableOpacity 
            key={item}
            style={styles.menuItem}
            onPress={() => {
              if (item === '회원 정보 수정') {

              } 
              else if (item === '알림 설정') {
                
              }
              else if (item === '공개 프로필 수정') {

              } 
              else if (item === '제출 명단 확인') {
                router.push('/submissionList');
              } 
              else if (item === '내가 쓴 구인글') {

              } 
              else if (item === '로그아웃') {
                setModalVisible(true);
              }
              else if (item === '회원탈퇴') {
                // 회원탈퇴 로직
              }
            }}>
            <Text style={styles.menuText}>{item}</Text>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>
        ))}
      </View>

      {/* 로그아웃 확인 모달 */}
      <Modal
        transparent
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        {/* 배경 오버레이 */}
        <View style={styles.modalOverlay} />

        {/* 모달 박스 */}
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>로그아웃</Text>
          <Text style={styles.modalMessage}>로그아웃 하시겠습니까?</Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelText}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleConfirmLogout}
            >
              <Text style={styles.confirmText}>확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  /* Header */
  header: {
    backgroundColor: '#f7b32b',
    paddingTop: 24,
    paddingBottom: 32,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTop: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBack: {
    position: 'absolute',
    left: 0,  // Figma x = 12
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },  
  iconBell: {
    position: 'absolute',
    left: 340,  // Figma x = 353
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },

  /* Profile */
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
  },
  profileImg: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#eee',
  },
  profileInfo: {
    marginLeft: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  subInfo: {
    fontSize: 13,
    marginTop: 4,
    color: '#fff',
  },
  loading: {
    marginTop: 40,
    alignItems: 'center',
  },

  /* Blank Card : news 또는 추천 프로필 같은게 들어갈 예정 */
  blankCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginTop: -13,
    marginHorizontal: 16,
    height: 100,
  },

  /* Menu */
  menuContainer: {
    marginTop: 20,
    marginHorizontal: 16,
    // wrapper가 없더라도 각 메뉴 아이템에 backgroundColor를 주셔도 됩니다.
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#f0f0f0',
  },
  menuText: {
    fontSize: 16,
    color: '#222',
  },
    /* 모달 오버레이 */
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  /* 모달 컨테이너 */
  modalContainer: {
    position: 'absolute',
    top: '40%',
    left: 30,
    right: 30,
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingTop: 24, // 여백처리
    paddingBottom: 0,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#222',
  },
  modalMessage: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    marginBottom: 25,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    height: 48,
    alignSelf: 'stretch',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#eee',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#AEAEB2',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 15,
  },
  cancelText: {
    fontSize: 16,
    color: '#222',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#f7b32b',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomRightRadius: 15,
  },
  confirmText: {
    fontSize: 16,
    color: '#fff',
  },
});