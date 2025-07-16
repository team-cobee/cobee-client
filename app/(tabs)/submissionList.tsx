import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    FlatList,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

type Submission = {
  id: string;
  name: string;
  avatarUrl: string;
};

const dummyData: Submission[] = Array.from({ length: 10 }).map((_, i) => ({
  id: String(i),
  name: '김갑자',
  avatarUrl: 'https://via.placeholder.com/40',
}));

export default function SubmissionList() {
  const router = useRouter();

  const [confirmedIds, setConfirmedIds] = useState<string[]>([]);

  const handlePressItem = (id: string) => {
    if (!confirmedIds.includes(id)) {
      setConfirmedIds(prev => [...prev, id]);
    }
    // 클릭 즉시 공개 프로필로 이동
    router.push({
      pathname: '/publicProfile',
      params: { id },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backIcon}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>제출 명단</Text>
      </View>

      {/* 리스트 */}
      <FlatList
        data={dummyData}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const isConfirmed = confirmedIds.includes(item.id);
          return (
            <TouchableOpacity
              style={[
                styles.itemContainer,
                {
                  backgroundColor: isConfirmed ? '#ffffff' : '#fff8e1',
                },
              ]}
              activeOpacity={0.8}
              onPress={() => handlePressItem(item.id)}
            >
              <Image source={{ uri: item.avatarUrl }} style={styles.avatar} />
              <Text style={styles.text}>
                {item.name}님께서 설문에 응답했습니다.
              </Text>
              {/* 초대 버튼은 그대로 두셔도 되고, 필요 없으면 제거하세요 */}
              <TouchableOpacity style={styles.inviteButton}>
                <Text style={styles.inviteText}>초대</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          );
        }}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
  },
  backIcon: { marginRight: 12 },
  title: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  list: { paddingVertical: 8 },

  // 전체 아이템 컨테이너를 터치 가능하게 바꿈
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ddd',
    marginRight: 12,
  },
  text: { flex: 1, fontSize: 14, color: '#222' },

  inviteButton: {
    backgroundColor: '#f7b32b',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  inviteText: { fontSize: 14, color: '#fff' },

  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#eee',
    marginHorizontal: 16,
  },
});
