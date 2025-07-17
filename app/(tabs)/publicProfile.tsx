// app/(tabs)/public-profile.tsx
import MainLayout from "@/components/layout/MainLayout";
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';

type Params = { id: string };

export default function PublicProfile() {
  const router = useRouter();
  const params = useLocalSearchParams<Params>();
  const id = params.id;

  // TODO: 실제 id 기반 fetch 로직 삽입
  const user = {
    name: '김박수',
    birth: '2000.01.01',
    avatarUrl: 'https://via.placeholder.com/80',
    deposit: '0 ~ 1000만원',
    rent: '20 ~ 60만원',
    mates: '2 ~ 4명',
  };

  return (
    <MainLayout
      title="공개 프로필"
      backType="arrow"
      showProfileIcon={false}
      showBellIcon={false}
    >
      <View style={styles.container}>

      {/* 프로필 카드 */}
      <View style={styles.profileCard}>
        <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
        <View style={styles.info}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.label}>Date of Birth</Text>
          <Text style={styles.birth}>{user.birth}</Text>
        </View>
      </View>

      {/* 희망 요구 카드 */}
      <View style={styles.requirementCard}>
        <Text style={styles.sectionTitle}>희망 요구</Text>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>보증금</Text>
          <Text style={styles.rowValue}>{user.deposit}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>월세</Text>
          <Text style={styles.rowValue}>{user.rent}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>MATE 인원</Text>
          <Text style={styles.rowValue}>{user.mates}</Text>
        </View>
      </View>

      {/* 빈 카드 (추가 정보) */}
      <View style={styles.blankCard}>
        <Text style={styles.blankText}>{user.deposit}</Text>
      </View>
      </View>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  /* 프로필 카드 */
  profileCard: {
    margin: 16,
    backgroundColor: '#fff2e0',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  avatar: { width: 80, height: 80, borderRadius: 40,backgroundColor: '#ddd', marginRight: 16 },
  info: {},
  name: { fontSize: 20, fontWeight: 'bold', marginBottom: 4, color: '#222' },
  label: { fontSize: 12, color: '#666' },
  birth: { fontSize: 16, color: '#222', marginTop: 2 },

  /* 희망 요구 카드 */
  requirementCard: {
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', marginBottom: 8, color: '#222' },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  rowLabel: { fontSize: 14, color: '#666' },
  rowValue: { fontSize: 14, color: '#222' },

  /* 빈 카드 */
  blankCard: {
    flex: 1,
    margin: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  blankText: { fontSize: 16, color: '#222' },
});
